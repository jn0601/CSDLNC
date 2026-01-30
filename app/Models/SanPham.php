<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SanPham extends Model
{
    protected $table = 'SANPHAM';
    protected $primaryKey = 'MASP';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = [
        'MASP',
        'TENSP',
        'DVT',
        'NUOCSX',
        'GIA'
    ];

    protected $casts = [
        'GIA' => 'decimal:2'
    ];

    // Relationships
    public function chiTietHoaDons()
    {
        return $this->hasMany(ChiTietHoaDon::class, 'MASP', 'MASP');
    }
}
