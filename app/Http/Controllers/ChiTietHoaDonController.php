<?php

namespace App\Http\Controllers;

use App\Models\ChiTietHoaDon;
use App\Models\HoaDon;
use App\Models\SanPham;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChiTietHoaDonController extends Controller
{
    public function index()
    {
        $chiTietHoaDons = ChiTietHoaDon::with(['hoaDon', 'sanPham'])
            ->orderBy('SOHD', 'desc')
            ->paginate(10);
        
        return Inertia::render('ChiTietHoaDon/Index', [
            'chiTietHoaDons' => $chiTietHoaDons
        ]);
    }

    public function create()
    {
        $hoaDons = HoaDon::orderBy('SOHD')->get();
        $sanPhams = SanPham::orderBy('MASP')->get();
        
        return Inertia::render('ChiTietHoaDon/Create', [
            'hoaDons' => $hoaDons,
            'sanPhams' => $sanPhams
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'SOHD' => 'required|exists:HOADON,SOHD',
            'MASP' => 'required|exists:SANPHAM,MASP',
            'SL' => 'nullable|integer|min:0',
        ]);

        // Check if combination already exists
        $exists = ChiTietHoaDon::where('SOHD', $validated['SOHD'])
            ->where('MASP', $validated['MASP'])
            ->exists();
            
        if ($exists) {
            if ($request->wantsJson() || $request->input('_inline')) {
                return response()->json([
                    'success' => false,
                    'message' => 'Sản phẩm này đã có trong hóa đơn!'
                ], 422);
            }
            
            return back()->withErrors([
                'MASP' => 'Sản phẩm này đã có trong hóa đơn!'
            ])->withInput();
        }

        $chiTiet = ChiTietHoaDon::create($validated);

        // Recalculate TRIGIA after adding new detail
        $this->updateHoaDonTrigia($validated['SOHD']);

        // Check if request expects JSON (for inline adds)
        if ($request->wantsJson() || $request->input('_inline')) {
            return response()->json([
                'success' => true,
                'message' => 'Thêm sản phẩm thành công!',
                'chiTiet' => $chiTiet->load('sanPham')
            ]);
        }

        return redirect()->route('chi-tiet-hoa-don.index')
            ->with('success', 'Thêm chi tiết hóa đơn thành công!');
    }

    public function show(string $sohd, string $masp)
    {
        $chiTietHoaDon = ChiTietHoaDon::with(['hoaDon', 'sanPham'])
            ->where('SOHD', $sohd)
            ->where('MASP', $masp)
            ->firstOrFail();
        
        return Inertia::render('ChiTietHoaDon/Show', [
            'chiTietHoaDon' => $chiTietHoaDon
        ]);
    }

    public function edit(string $sohd, string $masp)
    {
        $chiTietHoaDon = ChiTietHoaDon::where('SOHD', $sohd)
            ->where('MASP', $masp)
            ->firstOrFail();
        
        return Inertia::render('ChiTietHoaDon/Edit', [
            'chiTietHoaDon' => $chiTietHoaDon
        ]);
    }

    public function update(Request $request, string $sohd, string $masp)
    {
        $chiTietHoaDon = ChiTietHoaDon::where('SOHD', $sohd)
            ->where('MASP', $masp)
            ->firstOrFail();
        
        $validated = $request->validate([
            'SL' => 'nullable|integer|min:0',
        ]);

        $chiTietHoaDon->update($validated);

        // Recalculate TRIGIA after updating quantity
        $this->updateHoaDonTrigia($sohd);

        // Check if request expects JSON (for inline updates)
        if ($request->wantsJson() || $request->input('_inline')) {
            return response()->json([
                'success' => true,
                'message' => 'Cập nhật số lượng thành công!',
                'chiTiet' => $chiTietHoaDon->load('sanPham')
            ]);
        }

        return redirect()->route('chi-tiet-hoa-don.index')
            ->with('success', 'Cập nhật chi tiết hóa đơn thành công!');
    }

    public function destroy(string $sohd, string $masp)
    {
        $chiTietHoaDon = ChiTietHoaDon::where('SOHD', $sohd)
            ->where('MASP', $masp)
            ->firstOrFail();
            
        $chiTietHoaDon->delete();

        // Recalculate TRIGIA of the invoice after deleting detail
        $this->updateHoaDonTrigia($sohd);

        // Check if request expects JSON (for inline deletes from edit page)
        if (request()->wantsJson() || request()->input('_inline')) {
            return response()->json([
                'success' => true,
                'message' => 'Xóa chi tiết thành công!'
            ]);
        }

        return redirect()->route('chi-tiet-hoa-don.index')
            ->with('success', 'Xóa chi tiết hóa đơn thành công!');
    }

    /**
     * Update invoice TRIGIA after modifying chi tiết hóa đơn
     * Business rule: TRIGIA should reflect the actual total of items
     */
    private function updateHoaDonTrigia($sohd)
    {
        $hoaDon = HoaDon::find($sohd);
        if ($hoaDon) {
            // Calculate total from remaining chi tiết hóa đơn
            $total = ChiTietHoaDon::where('SOHD', $sohd)
                ->join('SANPHAM', 'CTHD.MASP', '=', 'SANPHAM.MASP')
                ->selectRaw('SUM(CTHD.SL * SANPHAM.GIA) as total')
                ->value('total') ?? 0;
            
            $oldTrigia = $hoaDon->TRIGIA;
            $hoaDon->update(['TRIGIA' => $total]);

            // Update customer DOANHSO if TRIGIA changed
            if ($oldTrigia != $total && $hoaDon->MAKH) {
                $this->updateCustomerDoanhso($hoaDon->MAKH);
            }
        }
    }

    /**
     * Update customer's DOANHSO based on total invoice value
     */
    private function updateCustomerDoanhso($maKH)
    {
        $customer = \App\Models\KhachHang::find($maKH);
        if ($customer) {
            $totalDoanhso = HoaDon::where('MAKH', $maKH)->sum('TRIGIA');
            $customer->update(['DOANHSO' => $totalDoanhso]);
        }
    }
}
