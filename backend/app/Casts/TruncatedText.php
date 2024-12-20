<?php

namespace App\Casts;

use Illuminate\Contracts\Database\Eloquent\CastsAttributes;
use Illuminate\Database\Eloquent\Model;

class TruncatedText implements CastsAttributes
{
    protected $limit;

    public function __construct($limit = 100)
    {
        $this->limit = $limit;
    }

    public function get(Model $model, string $key, mixed $value, array $attributes): mixed
    {
        return strlen($value) > $this->limit
            ? substr($value, 0, $this->limit) . '...'
            : $value;
    }

    public function set(Model $model, string $key, mixed $value, array $attributes): mixed
    {
        return $value;
    }
}
