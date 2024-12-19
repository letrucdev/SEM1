<?php

namespace App\Models;

use App\Casts\PostTypeCast;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Post extends Model
{
    use HasUuids;

    protected $fillable = ['title', 'content', 'user_id', 'description', 'post_type', 'thumbnail_path'];

    protected $casts = [
        'post_type' => PostTypeCast::class
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
