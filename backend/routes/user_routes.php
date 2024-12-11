<?php

use App\Http\Controllers\UserController;

Route::prefix('users')->controller(UserController::class)->group(function () {
    Route::get('/me', 'getMe');
    Route::post('/me', 'updateMe');
    Route::put('/me/password', 'updatePassword');

    Route::middleware('ability:manage-user')->group(function () {
        Route::get('/', 'getUser');
        Route::get('/{user}', 'showUser');
        Route::post('/{user}', 'updateUser');
        Route::delete('/{user}', 'destroyUser');
    });
});
