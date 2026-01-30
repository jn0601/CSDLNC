<?php

namespace App\Http\Controllers;

use App\Models\HoaDon;
use App\Models\KhachHang;
use App\Models\NhanVien;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HoaDonController extends Controller
{
    public function index()
    {
        $hoaDons = HoaDon::with(['khachHang', 'nhanVien'])
            ->withCount('chiTietHoaDons')
            ->orderBy('SOHD', 'desc')
            ->paginate(10);
        
        return Inertia::render('HoaDon/Index', [
            'hoaDons' => $hoaDons
        ]);
    }

    public function create()
    {
        $khachHangs = KhachHang::orderBy('MAKH')->get();
        $nhanViens = NhanVien::orderBy('MANV')->get();
        
        return Inertia::render('HoaDon/Create', [
            'khachHangs' => $khachHangs,
            'nhanViens' => $nhanViens
        ]);
    }

    public function store(Request $request)
    {
        // Convert DD/MM/YYYY to YYYY-MM-DD for date fields
        $data = $request->all();
        if (!empty($data['NGHD'])) {
            $data['NGHD'] = $this->convertDateFormat($data['NGHD']);
        }

        $validated = validator($data, [
            'SOHD' => 'required|integer|unique:HOADON,SOHD',
            'NGHD' => 'nullable|date',
            'MAKH' => 'nullable|exists:KHACHHANG,MAKH',
            'MANV' => 'nullable|exists:NHANVIEN,MANV',
            'TRIGIA' => 'nullable|numeric|min:0',
        ])->validate();

        HoaDon::create($validated);

        // Update customer DOANHSO if MAKH exists
        if (!empty($validated['MAKH'])) {
            $this->updateCustomerDoanhso($validated['MAKH']);
        }

        return redirect()->route('hoa-don.index')
            ->with('success', 'Thêm hóa đơn thành công!');
    }

    public function show(string $id)
    {
        $hoaDon = HoaDon::with(['khachHang', 'nhanVien', 'chiTietHoaDons.sanPham'])
            ->findOrFail($id);
        
        return Inertia::render('HoaDon/Show', [
            'hoaDon' => $hoaDon
        ]);
    }

    public function edit(string $id)
    {
        $hoaDon = HoaDon::findOrFail($id);
        $khachHangs = KhachHang::orderBy('MAKH')->get();
        $nhanViens = NhanVien::orderBy('MANV')->get();
        
        return Inertia::render('HoaDon/Edit', [
            'hoaDon' => $hoaDon,
            'khachHangs' => $khachHangs,
            'nhanViens' => $nhanViens
        ]);
    }

    public function update(Request $request, string $id)
    {
        $hoaDon = HoaDon::findOrFail($id);
        $oldMaKH = $hoaDon->MAKH;
        
        // Convert DD/MM/YYYY to YYYY-MM-DD for date fields
        $data = $request->all();
        if (!empty($data['NGHD'])) {
            $data['NGHD'] = $this->convertDateFormat($data['NGHD']);
        }

        $validated = validator($data, [
            'NGHD' => 'nullable|date',
            'MAKH' => 'nullable|exists:KHACHHANG,MAKH',
            'MANV' => 'nullable|exists:NHANVIEN,MANV',
            'TRIGIA' => 'nullable|numeric|min:0',
        ])->validate();

        $hoaDon->update($validated);

        // Update DOANHSO for old customer if changed
        if ($oldMaKH && $oldMaKH !== $validated['MAKH']) {
            $this->updateCustomerDoanhso($oldMaKH);
        }
        
        // Update DOANHSO for new customer
        if (!empty($validated['MAKH'])) {
            $this->updateCustomerDoanhso($validated['MAKH']);
        }

        return redirect()->route('hoa-don.index')
            ->with('success', 'Cập nhật hóa đơn thành công!');
    }

    public function destroy(string $id)
    {
        $hoaDon = HoaDon::findOrFail($id);
        $maKH = $hoaDon->MAKH;
        
        // Delete related chi tiet hoa don first to avoid foreign key constraint
        $hoaDon->chiTietHoaDons()->delete();
        
        $hoaDon->delete();

        // Update customer DOANHSO after deletion
        if ($maKH) {
            $this->updateCustomerDoanhso($maKH);
        }

        return redirect()->route('hoa-don.index')
            ->with('success', 'Xóa hóa đơn thành công!');
    }

    /**
     * Update customer's DOANHSO based on total invoice value
     * Business rule: DOANHSO = SUM(TRIGIA) of all invoices
     */
    private function updateCustomerDoanhso($maKH)
    {
        $customer = KhachHang::find($maKH);
        if ($customer) {
            $totalDoanhso = HoaDon::where('MAKH', $maKH)
                ->sum('TRIGIA');
            $customer->update(['DOANHSO' => $totalDoanhso]);
        }
    }

    /**
     * Convert DD/MM/YYYY format to YYYY-MM-DD for database
     */
    private function convertDateFormat($date)
    {
        if (empty($date)) return null;
        
        // If already in YYYY-MM-DD format, return as is
        if (preg_match('/^\d{4}-\d{2}-\d{2}$/', $date)) {
            return $date;
        }
        
        // Convert DD/MM/YYYY to YYYY-MM-DD
        if (preg_match('/^(\d{2})\/(\d{2})\/(\d{4})$/', $date, $matches)) {
            return $matches[3] . '-' . $matches[2] . '-' . $matches[1];
        }
        
        return $date;
    }
}
