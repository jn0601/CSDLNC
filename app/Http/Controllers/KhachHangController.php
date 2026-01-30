<?php

namespace App\Http\Controllers;

use App\Models\KhachHang;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KhachHangController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $khachHangs = KhachHang::orderBy('MAKH')->paginate(10);
        
        return Inertia::render('KhachHang/Index', [
            'khachHangs' => $khachHangs
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('KhachHang/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Convert DD/MM/YYYY to YYYY-MM-DD for date fields
        $data = $request->all();
        if (!empty($data['NGSINH'])) {
            $data['NGSINH'] = $this->convertDateFormat($data['NGSINH']);
        }
        if (!empty($data['NGDK'])) {
            $data['NGDK'] = $this->convertDateFormat($data['NGDK']);
        }

        $validated = validator($data, [
            'MAKH' => 'required|string|max:4|unique:KHACHHANG,MAKH',
            'HOTEN' => 'required|string|max:40',
            'DCHI' => 'nullable|string|max:50',
            'SODT' => 'nullable|string|max:20',
            'NGSINH' => 'nullable|date',
            'NGDK' => 'nullable|date',
            'DOANHSO' => 'nullable|numeric|min:0',
        ])->validate();

        KhachHang::create($validated);

        return redirect()->route('khach-hang.index')
            ->with('success', 'Thêm khách hàng thành công!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $khachHang = KhachHang::with('hoaDons')->findOrFail($id);
        
        return Inertia::render('KhachHang/Show', [
            'khachHang' => $khachHang
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $khachHang = KhachHang::findOrFail($id);
        
        return Inertia::render('KhachHang/Edit', [
            'khachHang' => $khachHang
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $khachHang = KhachHang::findOrFail($id);
        
        // Convert DD/MM/YYYY to YYYY-MM-DD for date fields
        $data = $request->all();
        if (!empty($data['NGSINH'])) {
            $data['NGSINH'] = $this->convertDateFormat($data['NGSINH']);
        }
        if (!empty($data['NGDK'])) {
            $data['NGDK'] = $this->convertDateFormat($data['NGDK']);
        }

        $validated = validator($data, [
            'HOTEN' => 'required|string|max:40',
            'DCHI' => 'nullable|string|max:50',
            'SODT' => 'nullable|string|max:20',
            'NGSINH' => 'nullable|date',
            'NGDK' => 'nullable|date',
            'DOANHSO' => 'nullable|numeric|min:0',
        ])->validate();

        $khachHang->update($validated);

        return redirect()->route('khach-hang.index')
            ->with('success', 'Cập nhật khách hàng thành công!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $khachHang = KhachHang::findOrFail($id);
        $khachHang->delete();

        return redirect()->route('khach-hang.index')
            ->with('success', 'Xóa khách hàng thành công!');
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