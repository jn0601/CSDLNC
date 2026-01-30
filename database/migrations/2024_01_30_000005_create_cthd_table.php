<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('CTHD', function (Blueprint $table) {
            $table->integer('SOHD');
            $table->string('MASP', 10);
            $table->integer('SL')->default(0);

            $table->primary(['SOHD', 'MASP']);
            $table->foreign('SOHD')->references('SOHD')->on('HOADON')->onDelete('cascade');
            $table->foreign('MASP')->references('MASP')->on('SANPHAM');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('CTHD');
    }
};
