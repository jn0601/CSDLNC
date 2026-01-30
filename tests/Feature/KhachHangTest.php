<?php

namespace Tests\Feature;

use App\Models\KhachHang;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use PHPUnit\Framework\Attributes\Test;

class KhachHangTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function can_view_khach_hang_index_page()
    {
        $response = $this->get(route('khach-hang.index'));

        $response->assertStatus(200);
    }

    #[Test]
    public function can_create_khach_hang()
    {
        $data = [
            'MAKH' => 'KH01',
            'HOTEN' => 'Nguyen Van A',
            'DCHI' => '123 Le Loi, Q1, TPHCM',
            'SODT' => '0901234567',
            'NGSINH' => '15/05/1990',
            'NGDK' => '01/01/2024',
        ];

        $response = $this->post(route('khach-hang.store'), $data);

        $response->assertRedirect(route('khach-hang.index'));
        $this->assertDatabaseHas('KHACHHANG', [
            'MAKH' => 'KH01',
            'HOTEN' => 'Nguyen Van A',
        ]);
    }

    #[Test]
    public function can_update_khach_hang()
    {
        $khachHang = KhachHang::create([
            'MAKH' => 'KH02',
            'HOTEN' => 'Tran Thi B',
            'DCHI' => '456 Nguyen Hue, Q1, TPHCM',
            'SODT' => '0912345678',
        ]);

        $updateData = [
            'HOTEN' => 'Tran Thi B Updated',
            'DCHI' => '789 Hai Ba Trung, Q3, TPHCM',
            'SODT' => '0923456789',
            'NGSINH' => '20/03/1985',
            'NGDK' => '15/02/2024',
        ];

        $response = $this->put(route('khach-hang.update', $khachHang->MAKH), $updateData);

        $response->assertRedirect(route('khach-hang.index'));
        $this->assertDatabaseHas('KHACHHANG', [
            'MAKH' => 'KH02',
            'HOTEN' => 'Tran Thi B Updated',
        ]);
    }

    #[Test]
    public function can_delete_khach_hang()
    {
        $khachHang = KhachHang::create([
            'MAKH' => 'KH03',
            'HOTEN' => 'Le Van C',
        ]);

        $response = $this->delete(route('khach-hang.destroy', $khachHang->MAKH));

        $response->assertRedirect(route('khach-hang.index'));
        $this->assertDatabaseMissing('KHACHHANG', [
            'MAKH' => 'KH03',
        ]);
    }

    #[Test]
    public function cannot_create_duplicate_makh()
    {
        KhachHang::create([
            'MAKH' => 'KH04',
            'HOTEN' => 'Test User',
        ]);

        $data = [
            'MAKH' => 'KH04', // Duplicate
            'HOTEN' => 'Another User',
        ];

        $response = $this->post(route('khach-hang.store'), $data);

        $response->assertSessionHasErrors('MAKH');
    }

    #[Test]
    public function validates_required_fields()
    {
        $response = $this->post(route('khach-hang.store'), []);

        $response->assertSessionHasErrors(['MAKH', 'HOTEN']);
    }
}
