<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ChiTietHoaDon extends Model
{
    protected $table = 'CTHD';
    protected $primaryKey = null;
    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'SOHD',
        'MASP',
        'SL'
    ];

    // Composite primary key handling
    protected function setKeysForSaveQuery($query)
    {
        $query->where('SOHD', $this->getAttribute('SOHD'))
              ->where('MASP', $this->getAttribute('MASP'));
        return $query;
    }

    // Relationships
    public function hoaDon()
    {
        return $this->belongsTo(HoaDon::class, 'SOHD', 'SOHD');
    }

    public function sanPham()
    {
        return $this->belongsTo(SanPham::class, 'MASP', 'MASP');
    }
}
