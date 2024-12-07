<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    use HasUuids;

    protected $fillable = ['name', 'stock', 'price', 'category'];

    protected $with = ['productImages'];

    public function productImages(): HasMany
    {
        return $this->hasMany(ProductImage::class);
    }

    public function productRates(): HasMany
    {
        return $this->hasMany(ProductRate::class);
    }
}
