<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class CartProduct extends Model
{
    use HasUuids;

    protected $fillable = ['cart_id', 'product_id', 'quantity'];
}
