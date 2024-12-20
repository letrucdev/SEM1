<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CourseLesson extends Model
{
    use HasUuids;

    protected $fillable = ['title', 'content', 'video_path', 'duration'];

    protected $touches = ['course'];

    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }
}
