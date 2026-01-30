# ⚡ Quick Setup Guide

## Prerequisites
- ✅ PHP 8.2+
- ✅ Composer 2.0+
- ✅ Node.js 18+
- ✅ SQL Server Express
- ✅ PHP SQL Server drivers (`sqlsrv`, `pdo_sqlsrv`)

## Installation (5 Minutes)

### 1. Clone & Install
```bash
git clone https://github.com/[your-username]/laravel_CSDLNC.git
cd laravel_CSDLNC
composer install
npm install
```

### 2. Environment Setup
```bash
copy .env.example .env
php artisan key:generate
```

### 3. Configure Database

Open `.env` and update:
```env
DB_CONNECTION=sqlsrv
DB_HOST=YOUR-PC-NAME\SQLEXPRESS
DB_PORT=1433
DB_DATABASE=QuanLyBanHang
DB_USERNAME=
DB_PASSWORD=
DB_TRUST_SERVER_CERTIFICATE=true
```

**Find your server name:**
- Open SQL Server Management Studio (SSMS)
- Look at "Server name" in connection dialog
- Example: `DESKTOP-ABC123\SQLEXPRESS`

### 4. Create Database

Open SSMS and run:
```sql
CREATE DATABASE QuanLyBanHang;
GO

USE QuanLyBanHang;
GO

-- Copy full schema from README.md
```

### 5. Run Application

**Terminal 1:**
```bash
php artisan serve
```

**Terminal 2:**
```bash
npm run dev
```

**Open browser:** http://localhost:8000

## Quick Test

```bash
php artisan test
```

Should see: 16-17 tests passing ✅

## Common Issues

### "SQLSTATE[08001]"
- SQL Server not running
- Wrong server name in `.env`
- Missing `DB_TRUST_SERVER_CERTIFICATE=true`

### "Extension sqlsrv is missing"
- Install PHP SQL Server drivers
- See: https://docs.microsoft.com/sql/connect/php/download-drivers-php-sql-server

### "Vite manifest not found"
- Run `npm run dev` in separate terminal
- Or build: `npm run build`

## Need Help?

1. Check [README.md](README.md) for full documentation
2. Check database schema section for SQL
3. Create GitHub Issue

---

**Ready to code!** 🚀
