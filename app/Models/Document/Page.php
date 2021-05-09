<?php

namespace App\Models\Document;

use App\Models\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Page extends Model
{
    use SoftDeletes, HasFactory;

    protected $table = 'document_pages';

    public function document(): BelongsTo
    {
        return $this->belongsTo(Document::class);
    }
}