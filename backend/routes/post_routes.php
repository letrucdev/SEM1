<?php

use App\Http\Controllers\PostController;


Route::prefix('posts')->controller(PostController::class)->group(function () {
    Route::get('/', 'index')->withoutMiddleware('auth:sanctum');

    Route::get('/{post}', 'show')->withoutMiddleware('auth:sanctum');

    Route::post('/', 'store')->can('create', \App\Models\Post::class);

    Route::post('/{post}', 'update')->can('update', 'post');

    Route::delete('/{post}', 'destroy')->can('update', 'post');
});
