<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SupportTicket extends Model
{
    use HasUuids;

    protected $fillable = ['handler_id', 'subject', 'message', 'contact_email', 'contact_phone'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
