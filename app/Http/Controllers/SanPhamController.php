<?php

namespace App\Http\Controllers;

use App\Models\SanPham;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SanPhamController extends Controller
{
    public function index()
    {
        $sanPhams = SanPham::orderBy('MASP')->paginate(10);
        
        return Inertia::render('SanPham/Index', [
            'sanPhams' => $sanPhams
        ]);
    }

    public function create()
    {
        return Inertia::render('SanPham/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'MASP' => 'required|string|max:4|unique:SANPHAM,MASP',
            'TENSP' => 'required|string|max:40',
            'DVT' => 'nullable|string|max:20',
            'NUOCSX' => 'nullable|string|max:40',
            'GIA' => 'nullable|numeric|min:0',
        ]);

        SanPham::create($validated);

        return redirect()->route('san-pham.index')
            ->with('success', 'Thêm sản phẩm thành công!');
    }

    public function show(string $id)
    {
        $sanPham = SanPham::findOrFail($id);
        
        return Inertia::render('SanPham/Show', [
            'sanPham' => $sanPham
        ]);
    }

    public function edit(string $id)
    {
        $sanPham = SanPham::findOrFail($id);
        
        return Inertia::render('SanPham/Edit', [
            'sanPham' => $sanPham
        ]);
    }

    public function update(Request $request, string $id)
    {
        $sanPham = SanPham::findOrFail($id);
        
        $validated = $request->validate([
            'TENSP' => 'required|string|max:40',
            'DVT' => 'nullable|string|max:20',
            'NUOCSX' => 'nullable|string|max:40',
            'GIA' => 'nullable|numeric|min:0',
        ]);

        $sanPham->update($validated);

        return redirect()->route('san-pham.index')
            ->with('success', 'Cập nhật sản phẩm thành công!');
    }

    public function destroy(string $id)
    {
        $sanPham = SanPham::findOrFail($id);
        $sanPham->delete();

        return redirect()->route('san-pham.index')
            ->with('success', 'Xóa sản phẩm thành công!');
    }
}
