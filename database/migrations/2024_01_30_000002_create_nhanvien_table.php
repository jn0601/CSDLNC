<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('NHANVIEN', function (Blueprint $table) {
            $table->string('MANV', 10)->primary();
            $table->string('HOTEN', 100);
            $table->string('SODT', 20)->nullable();
            $table->date('NGVL')->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('NHANVIEN');
    }
};
