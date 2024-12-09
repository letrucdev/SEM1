<?php


namespace App\Enums;

enum OrderStatus: int
{
    case Processing = 0;
    case Delivering = 1;
    case Delivered = 2;
    case Cancelled = 3;
    
}
