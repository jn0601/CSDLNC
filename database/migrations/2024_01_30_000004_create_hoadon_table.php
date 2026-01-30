<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('HOADON', function (Blueprint $table) {
            $table->integer('SOHD')->primary();
            $table->date('NGHD')->nullable();
            $table->string('MAKH', 10)->nullable();
            $table->string('MANV', 10)->nullable();
            $table->decimal('TRIGIA', 18, 0)->default(0);

            $table->foreign('MAKH')->references('MAKH')->on('KHACHHANG');
            $table->foreign('MANV')->references('MANV')->on('NHANVIEN');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('HOADON');
    }
};
