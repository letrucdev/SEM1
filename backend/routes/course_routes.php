<?php


use App\Http\Controllers\CourseController;

Route::prefix('courses')->controller(CourseController::class)->group(function () {
    Route::get('/', 'index')->withoutMiddleware('auth:sanctum');

    Route::get('/{course}', 'show')->withoutMiddleware('auth:sanctum');

    Route::get('/{course}/lessons', 'getLessons')->withoutMiddleware('auth:sanctum');

    Route::get('/{course}/lessons/{courseLesson}', 'getLessonDetail')->withoutMiddleware('auth:sanctum')->scopeBindings();

    Route::post('/', 'store')->can('create', \App\Models\Course::class);

    Route::post('/{course}', 'update')->can('update', 'course');

    Route::delete('/{course}', 'destroy')->can('delete', 'course');

    Route::post('/{course}/lessons', 'storeLesson')->can('update', 'course');

    Route::post('/{course}/lessons/{courseLesson}', 'updateLesson')->scopeBindings()->can('update', 'course');

    Route::delete('/{course}/lessons/{courseLesson}', 'destroyLesson')->scopeBindings()->can('delete', 'course');

});
