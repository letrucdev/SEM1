<?php

use App\Http\Controllers\LoginController;
use App\Http\Controllers\LogoutController;
use App\Http\Controllers\PasswordResetLinkController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\NewPasswordController;

Route::post('/login', LoginController::class);
Route::post('/register', RegisterController::class);
Route::post('/forgot-password', [PasswordResetLinkController::class, 'store']);
Route::post('/reset-password', [NewPasswordController::class, 'store']);
Route::post('/logout', LogoutController::class)->middleware('auth');
