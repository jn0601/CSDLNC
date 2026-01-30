<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\KhachHang;
use App\Models\NhanVien;
use App\Models\SanPham;
use App\Models\HoaDon;
use App\Models\ChiTietHoaDon;

class TestDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     * This creates sample test data that can be easily reset
     */
    public function run(): void
    {
        // Clear existing test data (optional - be careful!)
        // Only uncomment if you want to reset data
        // KhachHang::query()->delete();
        // NhanVien::query()->delete();
        // SanPham::query()->delete();
        // ChiTietHoaDon::query()->delete();
        // HoaDon::query()->delete();

        // Create test customers
        $customers = [
            ['MAKH' => 'KH01', 'HOTEN' => 'Nguyễn Văn A', 'DCHI' => '123 Lê Lợi, Q1, TPHCM', 'SODT' => '0901234567', 'NGSINH' => '1990-05-15', 'NGDK' => '2024-01-01', 'DOANHSO' => 0],
            ['MAKH' => 'KH02', 'HOTEN' => 'Trần Thị B', 'DCHI' => '456 Nguyễn Huệ, Q1, TPHCM', 'SODT' => '0912345678', 'NGSINH' => '1985-03-20', 'NGDK' => '2024-01-05', 'DOANHSO' => 0],
            ['MAKH' => 'KH03', 'HOTEN' => 'Lê Văn C', 'DCHI' => '789 Hai Bà Trưng, Q3, TPHCM', 'SODT' => '0923456789', 'NGSINH' => '1992-08-10', 'NGDK' => '2024-01-10', 'DOANHSO' => 0],
        ];

        foreach ($customers as $customer) {
            KhachHang::updateOrCreate(['MAKH' => $customer['MAKH']], $customer);
        }

        // Create test employees
        $employees = [
            ['MANV' => 'NV01', 'HOTEN' => 'Phạm Thị D', 'SODT' => '0934567890', 'NGVL' => '2023-06-01'],
            ['MANV' => 'NV02', 'HOTEN' => 'Hoàng Văn E', 'SODT' => '0945678901', 'NGVL' => '2023-07-15'],
        ];

        foreach ($employees as $employee) {
            NhanVien::updateOrCreate(['MANV' => $employee['MANV']], $employee);
        }

        // Create test products
        $products = [
            ['MASP' => 'SP01', 'TENSP' => 'Laptop Dell XPS 13', 'DVT' => 'cái', 'NUOCSX' => 'USA', 'GIA' => 25000000],
            ['MASP' => 'SP02', 'TENSP' => 'iPhone 15 Pro', 'DVT' => 'cái', 'NUOCSX' => 'China', 'GIA' => 30000000],
            ['MASP' => 'SP03', 'TENSP' => 'Samsung Galaxy S24', 'DVT' => 'cái', 'NUOCSX' => 'Korea', 'GIA' => 20000000],
            ['MASP' => 'SP04', 'TENSP' => 'AirPods Pro', 'DVT' => 'cái', 'NUOCSX' => 'China', 'GIA' => 5000000],
            ['MASP' => 'SP05', 'TENSP' => 'MacBook Pro 14', 'DVT' => 'cái', 'NUOCSX' => 'China', 'GIA' => 45000000],
        ];

        foreach ($products as $product) {
            SanPham::updateOrCreate(['MASP' => $product['MASP']], $product);
        }

        // Create test invoices
        $invoices = [
            ['SOHD' => 1001, 'NGHD' => '2024-01-15', 'MAKH' => 'KH01', 'MANV' => 'NV01', 'TRIGIA' => 55000000],
            ['SOHD' => 1002, 'NGHD' => '2024-01-16', 'MAKH' => 'KH02', 'MANV' => 'NV01', 'TRIGIA' => 30000000],
            ['SOHD' => 1003, 'NGHD' => '2024-01-17', 'MAKH' => 'KH01', 'MANV' => 'NV02', 'TRIGIA' => 20000000],
        ];

        foreach ($invoices as $invoice) {
            HoaDon::updateOrCreate(['SOHD' => $invoice['SOHD']], $invoice);
        }

        // Create test invoice details
        $details = [
            // Invoice 1001
            ['SOHD' => 1001, 'MASP' => 'SP01', 'SL' => 1], // Laptop 25M
            ['SOHD' => 1001, 'MASP' => 'SP02', 'SL' => 1], // iPhone 30M
            
            // Invoice 1002
            ['SOHD' => 1002, 'MASP' => 'SP02', 'SL' => 1], // iPhone 30M
            
            // Invoice 1003
            ['SOHD' => 1003, 'MASP' => 'SP03', 'SL' => 1], // Samsung 20M
        ];

        foreach ($details as $detail) {
            ChiTietHoaDon::updateOrCreate(
                ['SOHD' => $detail['SOHD'], 'MASP' => $detail['MASP']],
                $detail
            );
        }

        // Update DOANHSO for customers based on their invoices
        $this->updateDoanhso();

        $this->command->info('Test data seeded successfully!');
        $this->command->info('- 3 customers created');
        $this->command->info('- 2 employees created');
        $this->command->info('- 5 products created');
        $this->command->info('- 3 invoices created with details');
    }

    private function updateDoanhso()
    {
        $customers = KhachHang::all();
        foreach ($customers as $customer) {
            $total = HoaDon::where('MAKH', $customer->MAKH)->sum('TRIGIA');
            $customer->update(['DOANHSO' => $total]);
        }
    }
}
