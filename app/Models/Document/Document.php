<?php

namespace App\Models\Document;

use App\Models\User;
use App\Models\Model;
use App\Models\Document\Page;
use App\Models\Document\Group;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Document extends Model
{
    use SoftDeletes, HasFactory;

    protected $table = 'documents';

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function group(): BelongsTo
    {
        return $this->belongsTo(Group::class);
    }

    public function pages(): HasMany
    {
        return $this->hasMany(Page::class);
    }
}
