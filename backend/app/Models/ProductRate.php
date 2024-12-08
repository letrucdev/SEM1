<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductRate extends Model
{
    protected $fillable = ['user_id', 'star'];
}
