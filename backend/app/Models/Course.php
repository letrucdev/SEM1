<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Course extends Model
{
    use HasUuids;

    protected $fillable = [
        'title',
        'description',
        'user_id',
        'thumbnail_path'
    ];


    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function courseLessons(): HasMany
    {
        return $this->hasMany(CourseLesson::class);
    }
}
