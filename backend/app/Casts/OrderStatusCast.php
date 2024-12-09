<?php

namespace App\Casts;

use App\Enums\OrderStatus;
use Illuminate\Contracts\Database\Eloquent\CastsAttributes;
use Illuminate\Database\Eloquent\Model;

class OrderStatusCast implements CastsAttributes
{
    /**
     * Cast the given value.
     *
     * @param array<string> $attributes
     */
    public function get(Model $model, string $key, mixed $value, array $attributes): string
    {
        return OrderStatus::from($value)->name;
    }

    /**
     * Prepare the given value for storage.
     *
     * @param array<string, mixed> $attributes
     */
    public function set(Model $model, string $key, mixed $value, array $attributes): mixed
    {
        return $value;
    }
}
