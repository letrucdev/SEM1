<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductRate extends Model
{
    protected $fillable = ['user_id', 'star'];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
