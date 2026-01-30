<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('KHACHHANG', function (Blueprint $table) {
            $table->string('MAKH', 10)->primary();
            $table->string('HOTEN', 100);
            $table->string('DCHI', 200)->nullable();
            $table->string('SODT', 20)->nullable();
            $table->date('NGSINH')->nullable();
            $table->date('NGDK')->nullable();
            $table->decimal('DOANHSO', 18, 0)->default(0);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('KHACHHANG');
    }
};
