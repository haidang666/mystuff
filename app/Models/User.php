<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Query\Builder;
use Illuminate\Foundation\Auth\Access\Authorizable;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\URL;
use League\Glide\Server;

class User extends Model implements AuthenticatableContract, AuthorizableContract
{
    use SoftDeletes, Authenticatable, Authorizable, HasFactory;

    protected $casts = [
        'owner' => 'boolean',
    ];

    public function account(): BelongsTo
    {
        return $this->belongsTo(Account::class);
    }

    public function getNameAttribute()
    {
        return $this->first_name.' '.$this->last_name;
    }

    public function setPasswordAttribute($password)
    {
        if (! $password) {
            return;
        }

        $this->attributes['password'] = Hash::make($password);
    }

    public function setPhotoAttribute($photo)
    {
        if (! $photo) {
            return;
        }

        $this->attributes['photo_path'] = $photo instanceof UploadedFile ? $photo->store('users') : $photo;
    }

    public function getPhotoAttribute()
    {
        return $this->photoUrl(['w' => 40, 'h' => 40, 'fit' => 'crop']);
    }

    public function photoUrl(array $attributes)
    {
        if ($this->photo_path) {
            return URL::to(App::make(Server::class)->fromPath($this->photo_path, $attributes));
        }
    }

    public function isDemoUser()
    {
        return $this->email === 'johndoe@example.com';
    }

    /**
     * Scope a query to only include popular users.
     *
     * @param  Builder  $query
     */
    public function scopeOrderByName($query)
    {
        $query->orderBy('last_name')->orderBy('first_name');
    }

    /**
     * Scope a query to only include popular users.
     *
     * @param  Builder  $query
     * @param  string $role
     */
    public function scopeWhereRole($query, $role)
    {
        switch ($role) {
            case 'user':
                return $query->where('owner', false);
            case 'owner':
                return $query->where('owner', true);
        }
    }

    /**
     * Scope a query to only include popular users.
     *
     * @param  Builder  $query
     */
    public function scopeFilter($query, array $filters)
    {
        $query->when($filters['search'] ?? null, function ($query, string $search) {
            $query->where(function ($query) use ($search) {
                $query->where('first_name', 'like', '%'.$search.'%')
                    ->orWhere('last_name', 'like', '%'.$search.'%')
                    ->orWhere('email', 'like', '%'.$search.'%');
            });
        })->when($filters['role'] ?? null, function ($query, string $role) {
            $query->whereRole($role);
        })->when($filters['trashed'] ?? null, function ($query, string $trashed) {
            if ($trashed === 'with') {
                $query->withTrashed();
            } elseif ($trashed === 'only') {
                $query->onlyTrashed();
            }
        });
    }
}
