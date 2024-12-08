<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Cart extends Model
{
    use HasUuids;

    protected $fillable = ['user_id'];

    public function products(): BelongsToMany
    {
        return $this->belongsToMany(Product::class);
    }
}
