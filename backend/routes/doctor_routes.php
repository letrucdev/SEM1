<?php

use App\Http\Controllers\DoctorController;

Route::prefix('doctors')->middleware('ability:manage-user')->controller(DoctorController::class)->group(function () {
    Route::get('/', 'index')->withoutMiddleware(['ability:manage-user', 'auth:sanctum']);
    Route::get('/{user}', 'show');

    Route::post('/', 'store');
    Route::post('/{user}', 'update');
    Route::delete('/{user}', 'destroy');
});
