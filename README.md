# Hệ Thống Quản Lý Bán Hàng

Đồ án môn học: **Cơ Sở Dữ Liệu Nâng Cao**  
Hệ thống quản lý bán hàng với đầy đủ chức năng CRUD cho khách hàng, nhân viên, sản phẩm, hóa đơn và chi tiết hóa đơn.

[![Laravel](https://img.shields.io/badge/Laravel-12.48.1-red.svg)](https://laravel.com)
[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38B2AC.svg)](https://tailwindcss.com)
[![SQL Server](https://img.shields.io/badge/SQL%20Server-Express-CC2927.svg)](https://www.microsoft.com/sql-server)

## Mục Lục

- [Giới Thiệu](#-giới-thiệu)
- [Tính Năng](#-tính-năng)
- [Công Nghệ Sử Dụng](#-công-nghệ-sử-dụng)
- [Yêu Cầu Hệ Thống](#-yêu-cầu-hệ-thống)
- [Cài Đặt](#-cài-đặt)
- [Cấu Hình Database](#-cấu-hình-database)
- [Chạy Ứng Dụng](#-chạy-ứng-dụng)
- [Cấu Trúc Database](#-cấu-trúc-database)
- [Tính Năng Nâng Cao](#-tính-năng-nâng-cao)
- [Testing](#-testing)
- [Troubleshooting](#-troubleshooting)
- [Tài Liệu Bổ Sung](#-tài-liệu-bổ-sung)

## Giới Thiệu

Hệ thống quản lý bán hàng được xây dựng với Laravel 12.48.1 và React 18, sử dụng Inertia.js để kết nối giữa backend và frontend. Dự án kết nối với SQL Server Express và cung cấp giao diện quản trị hoàn chỉnh để quản lý:

- **Khách Hàng** - Thông tin khách hàng, doanh số tự động
- **Nhân Viên** - Quản lý nhân viên bán hàng
- **Sản Phẩm** - Danh mục sản phẩm
- **Hóa Đơn** - Quản lý đơn hàng
- **Chi Tiết Hóa Đơn** - Chi tiết từng mặt hàng trong hóa đơn

## Tính Năng

### Chức Năng Cơ Bản
- **CRUD hoàn chỉnh** cho tất cả các thực thể
- **Giao diện tiếng Việt** - Labels, thông báo, validation
- **Dark Mode** - Giao diện tối hiện đại
- **Responsive Design** - Tương thích mọi màn hình
- **Pagination** - Phân trang tự động

### Tính Năng Nâng Cao
- **Tự động tính DOANHSO** - Cập nhật khi tạo/sửa/xóa hóa đơn
- **Cascade Delete** - Xóa hóa đơn tự động xóa chi tiết
- **Định dạng ngày VN** - DD/MM/YYYY
- **Định dạng tiền VND** - Không decimal
- **Validation thông minh** - Thông báo lỗi tiếng Việt

### Bảo Mật
- **Foreign Key Constraints** - Toàn vẹn dữ liệu
- **Confirmation Dialog** - Xác nhận trước khi xóa
- **Automated Tests** - 17 test cases

## 🛠 Công Nghệ

- **Laravel 12.48.1** + **React 18** + **Inertia.js**
- **Tailwind CSS 4** + **Headless UI** + **Vite**
- **SQL Server Express** + **PHPUnit/Pest**

## Yêu Cầu

- PHP >= 8.2, Composer >= 2.0
- Node.js >= 18.0, NPM >= 9.0
- SQL Server Express 2019+
- Extensions: `sqlsrv`, `pdo_sqlsrv`, `mbstring`, etc.

## Cài Đặt

```bash
# Clone repository
git clone https://github.com/[your-username]/laravel_CSDLNC.git
cd laravel_CSDLNC

# Install dependencies
composer install
npm install

# Setup environment
copy .env.example .env
php artisan key:generate

# Configure .env
# DB_CONNECTION=sqlsrv
# DB_HOST=YOUR-SERVER\SQLEXPRESS
# DB_DATABASE=QuanLyBanHang
```

## Database Setup

```sql
CREATE DATABASE QuanLyBanHang;
-- Xem file README đầy đủ để biết schema chi tiết
```

## Chạy

```bash
# Terminal 1: Laravel
php artisan serve

# Terminal 2: Vite
npm run dev

# Truy cập: http://localhost:8000
```

## Database Schema

<details>
<summary>Click để xem SQL schema đầy đủ</summary>

```sql
-- Tạo database
CREATE DATABASE QuanLyBanHang;
GO

USE QuanLyBanHang;
GO

-- Bảng KHACHHANG
CREATE TABLE KHACHHANG (
    MAKH VARCHAR(10) PRIMARY KEY,
    HOTEN NVARCHAR(100) NOT NULL,
    DCHI NVARCHAR(200),
    SODT VARCHAR(20),
    NGSINH DATE,
    NGDK DATE,
    DOANHSO DECIMAL(18,0) DEFAULT 0
);

-- Bảng NHANVIEN
CREATE TABLE NHANVIEN (
    MANV VARCHAR(10) PRIMARY KEY,
    HOTEN NVARCHAR(100) NOT NULL,
    SODT VARCHAR(20),
    NGVL DATE
);

-- Bảng SANPHAM
CREATE TABLE SANPHAM (
    MASP VARCHAR(10) PRIMARY KEY,
    TENSP NVARCHAR(100) NOT NULL,
    DVT NVARCHAR(50),
    NUOCSX NVARCHAR(50),
    GIA DECIMAL(18,0) DEFAULT 0
);

-- Bảng HOADON
CREATE TABLE HOADON (
    SOHD INT PRIMARY KEY,
    NGHD DATE,
    MAKH VARCHAR(10),
    MANV VARCHAR(10),
    TRIGIA DECIMAL(18,0) DEFAULT 0,
    FOREIGN KEY (MAKH) REFERENCES KHACHHANG(MAKH),
    FOREIGN KEY (MANV) REFERENCES NHANVIEN(MANV)
);

-- Bảng CTHD (Chi Tiết Hóa Đơn)
CREATE TABLE CTHD (
    SOHD INT,
    MASP VARCHAR(10),
    SL INT DEFAULT 0,
    PRIMARY KEY (SOHD, MASP),
    FOREIGN KEY (SOHD) REFERENCES HOADON(SOHD) ON DELETE CASCADE,
    FOREIGN KEY (MASP) REFERENCES SANPHAM(MASP)
);
```
</details>

## Testing

Chạy automated tests:
```bash
php artisan test
```

17 test cases covering:
- CRUD operations
- Business logic (DOANHSO auto-calculation)
- Cascade delete
- Date format validation (DD/MM/YYYY)
- Vietnamese localization

## Troubleshooting

### Lỗi kết nối SQL Server
```bash
# Kiểm tra SQL Server đang chạy
services.msc
# Tìm "SQL Server (SQLEXPRESS)" → phải "Running"

# Cập nhật .env với tên server chính xác
DB_HOST=YOUR-PC-NAME\SQLEXPRESS
DB_TRUST_SERVER_CERTIFICATE=true
```

### Lỗi Vite manifest
```bash
# Chạy Vite dev server
npm run dev

# Hoặc build assets
npm run build
```

### Port 8000 đã dùng
```bash
# Dùng port khác
php artisan serve --port=8080
```

## License

MIT License - xem file [LICENSE](LICENSE) để biết thêm chi tiết.


---
