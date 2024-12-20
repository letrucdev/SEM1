<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    use HasUuids;

    protected $fillable = ['name', 'stock', 'price', 'product_category_id'];

    protected $hidden = ['product_category_id'];

    protected $casts = [
        'product_rates_avg_star' => 'decimal:1'
    ];


    public function productImages(): HasMany
    {
        return $this->hasMany(ProductImage::class);
    }

    public function productRates(): HasMany
    {
        return $this->hasMany(ProductRate::class);
    }

    public function productCategory(): BelongsTo
    {
        return $this->belongsTo(ProductCategory::class);
    }

    public function carts(): BelongsToMany
    {
        return $this->belongsToMany(Cart::class);
    }

    public function orders(): BelongsToMany
    {
        return $this->belongsToMany(Order::class);
    }
}
