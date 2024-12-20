<?php

namespace App\Policies;

use App\Enums\UserRole;
use App\Models\User;

class SupportTicketPolicy
{
    /**
     * Create a new policy instance.
     */
    public function viewAny(User $user)
    {
        return $user->role === UserRole::Admin->name;
    }

    public function delete(User $user)
    {
        return $user->role === UserRole::Admin->name;
    }
}
