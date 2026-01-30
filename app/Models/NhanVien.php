<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NhanVien extends Model
{
    protected $table = 'NHANVIEN';
    protected $primaryKey = 'MANV';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = [
        'MANV',
        'HOTEN',
        'SODT',
        'NGVL'
    ];

    protected $casts = [
        'NGVL' => 'datetime'
    ];

    // Relationships
    public function hoaDons()
    {
        return $this->hasMany(HoaDon::class, 'MANV', 'MANV');
    }
}
