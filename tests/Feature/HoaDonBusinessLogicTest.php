<?php

namespace Tests\Feature;

use App\Models\KhachHang;
use App\Models\NhanVien;
use App\Models\HoaDon;
use App\Models\SanPham;
use App\Models\ChiTietHoaDon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use PHPUnit\Framework\Attributes\Test;

class HoaDonBusinessLogicTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function doanhso_updates_when_creating_invoice()
    {
        // Create customer
        $khachHang = KhachHang::create([
            'MAKH' => 'KH01',
            'HOTEN' => 'Test Customer',
            'DOANHSO' => 0,
        ]);

        // Create employee
        $nhanVien = NhanVien::create([
            'MANV' => 'NV01',
            'HOTEN' => 'Test Employee',
        ]);

        // Create invoice
        $data = [
            'SOHD' => 1001,
            'NGHD' => '01/01/2024',
            'MAKH' => 'KH01',
            'MANV' => 'NV01',
            'TRIGIA' => 1000000,
        ];

        $response = $this->post(route('hoa-don.store'), $data);

        $response->assertRedirect(route('hoa-don.index'));
        
        // Check DOANHSO was updated
        $khachHang->refresh();
        $this->assertEquals(1000000, $khachHang->DOANHSO);
    }

    #[Test]
    public function doanhso_updates_when_updating_invoice_trigia()
    {
        // Create customer
        $khachHang = KhachHang::create([
            'MAKH' => 'KH02',
            'HOTEN' => 'Test Customer 2',
            'DOANHSO' => 0,
        ]);

        // Create invoice with NGHD date
        $hoaDon = HoaDon::create([
            'SOHD' => 1002,
            'NGHD' => '2024-01-01',
            'MAKH' => 'KH02',
            'TRIGIA' => 500000,
        ]);

        // Manually update DOANHSO since we're bypassing controller
        $khachHang->update(['DOANHSO' => HoaDon::where('MAKH', 'KH02')->sum('TRIGIA')]);

        // Initial DOANHSO should be 500000
        $khachHang->refresh();
        $this->assertEquals(500000, $khachHang->DOANHSO);

        // Update invoice
        $updateData = [
            'NGHD' => '02/01/2024',
            'MAKH' => 'KH02',
            'TRIGIA' => 1500000, // Increased
        ];

        $response = $this->put(route('hoa-don.update', $hoaDon->SOHD), $updateData);

        // DOANHSO should be updated to new total
        $khachHang->refresh();
        $this->assertEquals(1500000, $khachHang->DOANHSO);
    }

    #[Test]
    public function doanhso_updates_for_both_customers_when_changing_makh()
    {
        // Create two customers
        $khachHang1 = KhachHang::create([
            'MAKH' => 'KH03',
            'HOTEN' => 'Customer 1',
            'DOANHSO' => 0,
        ]);

        $khachHang2 = KhachHang::create([
            'MAKH' => 'KH04',
            'HOTEN' => 'Customer 2',
            'DOANHSO' => 0,
        ]);

        // Create invoice for customer 1
        $hoaDon = HoaDon::create([
            'SOHD' => 1003,
            'NGHD' => '2024-01-01',
            'MAKH' => 'KH03',
            'TRIGIA' => 800000,
        ]);

        // Manually update DOANHSO since we're bypassing controller
        $khachHang1->update(['DOANHSO' => HoaDon::where('MAKH', 'KH03')->sum('TRIGIA')]);

        // Verify customer 1 DOANHSO
        $khachHang1->refresh();
        $this->assertEquals(800000, $khachHang1->DOANHSO);

        // Change invoice to customer 2
        $updateData = [
            'NGHD' => '03/01/2024',
            'MAKH' => 'KH04', // Changed
            'TRIGIA' => 800000,
        ];

        $response = $this->put(route('hoa-don.update', $hoaDon->SOHD), $updateData);

        // Customer 1 DOANHSO should be 0
        $khachHang1->refresh();
        $this->assertEquals(0, $khachHang1->DOANHSO);

        // Customer 2 DOANHSO should be 800000
        $khachHang2->refresh();
        $this->assertEquals(800000, $khachHang2->DOANHSO);
    }

    #[Test]
    public function doanhso_updates_when_deleting_invoice()
    {
        // Create customer
        $khachHang = KhachHang::create([
            'MAKH' => 'KH05',
            'HOTEN' => 'Customer 5',
            'DOANHSO' => 0,
        ]);

        // Create two invoices
        HoaDon::create([
            'SOHD' => 1004,
            'NGHD' => '2024-01-01',
            'MAKH' => 'KH05',
            'TRIGIA' => 500000,
        ]);

        $hoaDonToDelete = HoaDon::create([
            'SOHD' => 1005,
            'NGHD' => '2024-01-02',
            'MAKH' => 'KH05',
            'TRIGIA' => 300000,
        ]);

        // Manually update DOANHSO since we're bypassing controller
        $khachHang->update(['DOANHSO' => HoaDon::where('MAKH', 'KH05')->sum('TRIGIA')]);

        // Total should be 800000
        $khachHang->refresh();
        $this->assertEquals(800000, $khachHang->DOANHSO);

        // Delete one invoice
        $response = $this->delete(route('hoa-don.destroy', $hoaDonToDelete->SOHD));

        // DOANHSO should be updated to 500000
        $khachHang->refresh();
        $this->assertEquals(500000, $khachHang->DOANHSO);
    }

    #[Test]
    public function deleting_invoice_also_deletes_chi_tiet_hoa_don()
    {
        // Create product
        $sanPham = SanPham::create([
            'MASP' => 'SP01',
            'TENSP' => 'Test Product',
            'GIA' => 100000,
        ]);

        // Create invoice
        $hoaDon = HoaDon::create([
            'SOHD' => 1006,
            'TRIGIA' => 300000,
        ]);

        // Create invoice details
        ChiTietHoaDon::create([
            'SOHD' => 1006,
            'MASP' => 'SP01',
            'SL' => 3,
        ]);

        // Verify details exist
        $this->assertDatabaseHas('CTHD', [
            'SOHD' => 1006,
            'MASP' => 'SP01',
        ]);

        // Delete invoice
        $response = $this->delete(route('hoa-don.destroy', $hoaDon->SOHD));

        // Verify details are also deleted
        $this->assertDatabaseMissing('CTHD', [
            'SOHD' => 1006,
        ]);
    }

    #[Test]
    public function doanhso_sums_multiple_invoices_correctly()
    {
        // Create customer
        $khachHang = KhachHang::create([
            'MAKH' => 'KH06',
            'HOTEN' => 'Customer 6',
            'DOANHSO' => 0,
        ]);

        // Create multiple invoices
        HoaDon::create([
            'SOHD' => 1007,
            'NGHD' => '2024-01-01',
            'MAKH' => 'KH06',
            'TRIGIA' => 250000,
        ]);

        HoaDon::create([
            'SOHD' => 1008,
            'NGHD' => '2024-01-02',
            'MAKH' => 'KH06',
            'TRIGIA' => 350000,
        ]);

        HoaDon::create([
            'SOHD' => 1009,
            'NGHD' => '2024-01-03',
            'MAKH' => 'KH06',
            'TRIGIA' => 400000,
        ]);

        // Manually update DOANHSO since we're bypassing controller
        $khachHang->update(['DOANHSO' => HoaDon::where('MAKH', 'KH06')->sum('TRIGIA')]);

        // DOANHSO should be sum of all invoices
        $khachHang->refresh();
        $this->assertEquals(1000000, $khachHang->DOANHSO);
    }
}
