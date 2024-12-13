<?php

namespace App\Models;

use App\Casts\TruncatedText;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class SupportTicket extends Model
{
    use HasUuids;

    protected $fillable = ['subject', 'message', 'contact_email', 'contact_phone'];

    protected $casts = [
        'subject' => TruncatedText::class . ':30',
        'message' => TruncatedText::class . ':50', // Truncate to 150 characters
    ];

}
