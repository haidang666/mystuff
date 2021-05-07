<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDocumentPageTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('document_pages', function (Blueprint $table) {
            $table->id();
            $table->integer('document_id')->index();
            $table->string('name', 100)->nullable();
            $table->string('photo_url')->nullable();
            $table->text('text')->nullable();
            $table->integer('position');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::dropIfExists('document_pages');
    }
}
