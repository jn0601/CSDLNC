<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\KhachHangController;
use App\Http\Controllers\NhanVienController;
use App\Http\Controllers\SanPhamController;
use App\Http\Controllers\HoaDonController;
use App\Http\Controllers\ChiTietHoaDonController;

// Dashboard - No authentication required
Route::get('/', function () {
    return Inertia::render('Dashboard');
})->name('dashboard');

// Resource routes for CRUD operations
Route::resource('khach-hang', KhachHangController::class);
Route::resource('nhan-vien', NhanVienController::class);
Route::resource('san-pham', SanPhamController::class);
Route::resource('hoa-don', HoaDonController::class);

// Chi Tiet Hoa Don with composite key routing
Route::get('chi-tiet-hoa-don', [ChiTietHoaDonController::class, 'index'])->name('chi-tiet-hoa-don.index');
Route::get('chi-tiet-hoa-don/create', [ChiTietHoaDonController::class, 'create'])->name('chi-tiet-hoa-don.create');
Route::post('chi-tiet-hoa-don', [ChiTietHoaDonController::class, 'store'])->name('chi-tiet-hoa-don.store');
Route::get('chi-tiet-hoa-don/{sohd}/{masp}', [ChiTietHoaDonController::class, 'show'])->name('chi-tiet-hoa-don.show');
Route::get('chi-tiet-hoa-don/{sohd}/{masp}/edit', [ChiTietHoaDonController::class, 'edit'])->name('chi-tiet-hoa-don.edit');
Route::put('chi-tiet-hoa-don/{sohd}/{masp}', [ChiTietHoaDonController::class, 'update'])->name('chi-tiet-hoa-don.update');
Route::delete('chi-tiet-hoa-don/{sohd}/{masp}', [ChiTietHoaDonController::class, 'destroy'])->name('chi-tiet-hoa-don.destroy');

// Profile routes removed - not needed for admin interface

// Auth routes still available but not enforced
require __DIR__.'/auth.php';
