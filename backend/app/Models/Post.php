<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Post extends Model
{
    use HasUuids;

    protected $fillable = ['title', 'content', 'user_id', 'description', 'post_type'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
