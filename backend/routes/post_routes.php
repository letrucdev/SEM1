<?php

use App\Http\Controllers\PostController;


Route::prefix('posts')->controller(PostController::class)->group(function () {
    Route::get('/', 'index')->withoutMiddleware('auth:sanctum');

    Route::get('/{post}', 'show')->withoutMiddleware('auth:sanctum');

    Route::post('/', 'store');

    Route::post('/{post}', 'update');

    Route::delete('/{post}', 'destroy');
});
