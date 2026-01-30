<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('SANPHAM', function (Blueprint $table) {
            $table->string('MASP', 10)->primary();
            $table->string('TENSP', 100);
            $table->string('DVT', 50)->nullable();
            $table->string('NUOCSX', 50)->nullable();
            $table->decimal('GIA', 18, 0)->default(0);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('SANPHAM');
    }
};
