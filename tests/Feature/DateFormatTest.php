<?php

namespace Tests\Feature;

use App\Models\KhachHang;
use App\Models\NhanVien;
use App\Models\HoaDon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use PHPUnit\Framework\Attributes\Test;

class DateFormatTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function can_create_khach_hang_with_dd_mm_yyyy_date_format()
    {
        $data = [
            'MAKH' => 'KH01',
            'HOTEN' => 'Test User',
            'NGSINH' => '15/05/1990',
            'NGDK' => '01/01/2024',
        ];

        $response = $this->post(route('khach-hang.store'), $data);

        $response->assertRedirect(route('khach-hang.index'));
        
        $khachHang = KhachHang::where('MAKH', 'KH01')->first();
        $this->assertNotNull($khachHang);
        
        // Dates should be stored in YYYY-MM-DD format
        $this->assertEquals('1990-05-15', $khachHang->NGSINH->format('Y-m-d'));
        $this->assertEquals('2024-01-01', $khachHang->NGDK->format('Y-m-d'));
    }

    #[Test]
    public function can_update_khach_hang_with_dd_mm_yyyy_date_format()
    {
        $khachHang = KhachHang::create([
            'MAKH' => 'KH02',
            'HOTEN' => 'Test User 2',
        ]);

        $updateData = [
            'HOTEN' => 'Test User 2 Updated',
            'NGSINH' => '20/12/1985',
            'NGDK' => '15/03/2024',
        ];

        $response = $this->put(route('khach-hang.update', $khachHang->MAKH), $updateData);

        $response->assertRedirect(route('khach-hang.index'));
        
        $khachHang->refresh();
        $this->assertEquals('1985-12-20', $khachHang->NGSINH->format('Y-m-d'));
        $this->assertEquals('2024-03-15', $khachHang->NGDK->format('Y-m-d'));
    }

    #[Test]
    public function can_create_nhan_vien_with_dd_mm_yyyy_date_format()
    {
        $data = [
            'MANV' => 'NV01',
            'HOTEN' => 'Employee 1',
            'NGVL' => '10/06/2023',
        ];

        $response = $this->post(route('nhan-vien.store'), $data);

        $response->assertRedirect(route('nhan-vien.index'));
        
        $nhanVien = NhanVien::where('MANV', 'NV01')->first();
        $this->assertEquals('2023-06-10', $nhanVien->NGVL->format('Y-m-d'));
    }

    #[Test]
    public function can_create_hoa_don_with_dd_mm_yyyy_date_format()
    {
        $data = [
            'SOHD' => 1001,
            'NGHD' => '25/01/2024',
            'TRIGIA' => 500000,
        ];

        $response = $this->post(route('hoa-don.store'), $data);

        $response->assertRedirect(route('hoa-don.index'));
        
        $hoaDon = HoaDon::where('SOHD', 1001)->first();
        $this->assertEquals('2024-01-25', $hoaDon->NGHD->format('Y-m-d'));
    }

    #[Test]
    public function validates_invalid_date_format()
    {
        $data = [
            'MAKH' => 'KH03',
            'HOTEN' => 'Test User',
            'NGSINH' => '32/13/2020', // Invalid date
        ];

        $response = $this->post(route('khach-hang.store'), $data);

        $response->assertSessionHasErrors('NGSINH');
    }
}
