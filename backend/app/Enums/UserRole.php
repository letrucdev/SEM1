<?php

namespace App\Enums;

enum UserRole: int
{
    case User = 0;
    case Doctor = 1;
    case Admin = 2;

    /*    public function label()
        {
            return match ($this) {
                self::User => 'User',
                self::Doctor => 'Doctor',
                self::Admin => 'Admin',
            };
        }*/
}
