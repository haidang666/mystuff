<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDocumentGroupsTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('document_groups', function (Blueprint $table) {
            $table->id();
            $table->string('name', 200);
            $table->timestamps();
            $table->integer('user_id')->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::dropIfExists('document_groups');
    }
}
