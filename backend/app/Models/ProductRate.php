<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductRate extends Model
{
    use HasUuids;

    protected $fillable = ['user_id', 'product_id', 'star'];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
