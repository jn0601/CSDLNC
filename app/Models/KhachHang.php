<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class KhachHang extends Model
{
    protected $table = 'KHACHHANG';
    protected $primaryKey = 'MAKH';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = [
        'MAKH',
        'HOTEN',
        'DCHI',
        'SODT',
        'NGSINH',
        'NGDK',
        'DOANHSO'
    ];

    protected $casts = [
        'NGSINH' => 'datetime',
        'NGDK' => 'datetime',
        'DOANHSO' => 'decimal:2'
    ];

    // Relationships
    public function hoaDons()
    {
        return $this->hasMany(HoaDon::class, 'MAKH', 'MAKH');
    }
}
