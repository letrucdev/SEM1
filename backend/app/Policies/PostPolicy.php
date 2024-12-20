<?php

namespace App\Policies;

use App\Enums\UserRole;
use App\Models\Post;
use App\Models\User;

class PostPolicy
{
    /**
     * Create a new policy instance.
     */
    public function create(User $user)
    {
        return $user->role === UserRole::Admin->name || $user->role === UserRole::Doctor;
    }

    public function update(User $user, Post $post)
    {
        return $user->id === $post->user_id || $user->role === UserRole::Admin->name;
    }
}
