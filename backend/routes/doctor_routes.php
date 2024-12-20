<?php

use App\Http\Controllers\DoctorController;

Route::prefix('doctors')->middleware('can:create,App\Models\User')->controller(DoctorController::class)->group(function () {
    Route::get('/', 'index')->withoutMiddleware(['auth:sanctum', 'can:create,App\Models\User']);
    Route::get('/{user}', 'show');

    Route::post('/', 'store');
    Route::post('/{user}', 'update');
    Route::delete('/{user}', 'destroy');
});
