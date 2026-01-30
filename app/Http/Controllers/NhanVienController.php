<?php

namespace App\Http\Controllers;

use App\Models\NhanVien;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NhanVienController extends Controller
{
    public function index()
    {
        $nhanViens = NhanVien::orderBy('MANV')->paginate(10);
        
        return Inertia::render('NhanVien/Index', [
            'nhanViens' => $nhanViens
        ]);
    }

    public function create()
    {
        return Inertia::render('NhanVien/Create');
    }

    public function store(Request $request)
    {
        // Convert DD/MM/YYYY to YYYY-MM-DD for date fields
        $data = $request->all();
        if (!empty($data['NGVL'])) {
            $data['NGVL'] = $this->convertDateFormat($data['NGVL']);
        }

        $validated = validator($data, [
            'MANV' => 'required|string|max:4|unique:NHANVIEN,MANV',
            'HOTEN' => 'required|string|max:40',
            'SODT' => 'nullable|string|max:20',
            'NGVL' => 'nullable|date',
        ])->validate();

        NhanVien::create($validated);

        return redirect()->route('nhan-vien.index')
            ->with('success', 'Thêm nhân viên thành công!');
    }

    public function show(string $id)
    {
        $nhanVien = NhanVien::with('hoaDons')->findOrFail($id);
        
        return Inertia::render('NhanVien/Show', [
            'nhanVien' => $nhanVien
        ]);
    }

    public function edit(string $id)
    {
        $nhanVien = NhanVien::findOrFail($id);
        
        return Inertia::render('NhanVien/Edit', [
            'nhanVien' => $nhanVien
        ]);
    }

    public function update(Request $request, string $id)
    {
        $nhanVien = NhanVien::findOrFail($id);
        
        // Convert DD/MM/YYYY to YYYY-MM-DD for date fields
        $data = $request->all();
        if (!empty($data['NGVL'])) {
            $data['NGVL'] = $this->convertDateFormat($data['NGVL']);
        }

        $validated = validator($data, [
            'HOTEN' => 'required|string|max:40',
            'SODT' => 'nullable|string|max:20',
            'NGVL' => 'nullable|date',
        ])->validate();

        $nhanVien->update($validated);

        return redirect()->route('nhan-vien.index')
            ->with('success', 'Cập nhật nhân viên thành công!');
    }

    public function destroy(string $id)
    {
        $nhanVien = NhanVien::findOrFail($id);
        $nhanVien->delete();

        return redirect()->route('nhan-vien.index')
            ->with('success', 'Xóa nhân viên thành công!');
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
