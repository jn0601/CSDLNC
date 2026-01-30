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
            return back()->withErrors([
                'MASP' => 'Sản phẩm này đã có trong hóa đơn!'
            ])->withInput();
        }

        ChiTietHoaDon::create($validated);

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

        return redirect()->route('chi-tiet-hoa-don.index')
            ->with('success', 'Cập nhật chi tiết hóa đơn thành công!');
    }

    public function destroy(string $sohd, string $masp)
    {
        $chiTietHoaDon = ChiTietHoaDon::where('SOHD', $sohd)
            ->where('MASP', $masp)
            ->firstOrFail();
            
        $chiTietHoaDon->delete();

        return redirect()->route('chi-tiet-hoa-don.index')
            ->with('success', 'Xóa chi tiết hóa đơn thành công!');
    }
}
