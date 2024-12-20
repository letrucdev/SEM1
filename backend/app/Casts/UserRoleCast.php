<?php

namespace App\Casts;

use App\Enums\UserRole;
use Illuminate\Contracts\Database\Eloquent\CastsAttributes;

class UserRoleCast implements CastsAttributes
{
    /**
     * Cast the given value.
     *
     * @param array<string, mixed> $attributes
     */
    public function get($model, string $key, $value, array $attributes)
    {
        return UserRole::from($value)->name;
    }

    public function set($model, string $key, $value, array $attributes)
    {
        return $value;
    }
}
