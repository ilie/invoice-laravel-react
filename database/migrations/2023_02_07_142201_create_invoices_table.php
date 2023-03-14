<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('invoices', function (Blueprint $table) {
            $table->id()->unique();
            $table->foreignUuid('client_id')->onUpdate('cascade')->onDelete('cascade');
            $table->enum('status', ['draft', 'pending_payment', 'paid']);
            $table->integer('irpf', $autoIncrement = false);
            $table->integer('vat', $autoIncrement = false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('invoices');
    }
};
