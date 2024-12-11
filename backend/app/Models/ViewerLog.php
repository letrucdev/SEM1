<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ViewerLog extends Model
{
    public $timestamps = false;

    protected $fillable = ['ip_address', 'user_agent'];
}
