<?php

namespace App\Policies;

use App\Enums\UserRole;
use App\Models\Order;
use App\Models\User;

class OrderPolicy
{
    /**
     * Create a new policy instance.
     */
    public function viewAny(User $user)
    {
        return $user->role === UserRole::Admin->name;
    }

    public function cancel(User $user, Order $order)
    {
        return $user->role === UserRole::Admin->name || $order->user_id === $user->id;
    }
}
