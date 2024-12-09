<?php

use App\Http\Controllers\LoginController;
use App\Http\Controllers\RegisterController;

Route::post('/login', LoginController::class);
Route::post('/register', RegisterController::class);
