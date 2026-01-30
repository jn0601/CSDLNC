<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HoaDon extends Model
{
    protected $table = 'HOADON';
    protected $primaryKey = 'SOHD';
    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'SOHD',
        'NGHD',
        'MAKH',
        'MANV',
        'TRIGIA'
    ];

    protected $casts = [
        'NGHD' => 'datetime',
        'TRIGIA' => 'decimal:2'
    ];

    // Relationships
    public function khachHang()
    {
        return $this->belongsTo(KhachHang::class, 'MAKH', 'MAKH');
    }

    public function nhanVien()
    {
        return $this->belongsTo(NhanVien::class, 'MANV', 'MANV');
    }

    public function chiTietHoaDons()
    {
        return $this->hasMany(ChiTietHoaDon::class, 'SOHD', 'SOHD');
    }
}
