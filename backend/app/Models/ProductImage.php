<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductImage extends Model
{
    use HasUuids;

    public $timestamps = false;

    protected $fillable = ['product_id', 'image_path'];

    protected $touches = ['product'];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    /*    public function getImagePathAttribute($value)
        {
            return Storage::url($value);
        }*/
}
