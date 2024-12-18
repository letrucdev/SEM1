<?php


use App\Http\Controllers\CourseController;

Route::prefix('courses')->controller(CourseController::class)->group(function () {
    Route::get('/', 'index')->withoutMiddleware('auth:sanctum');

    Route::get('/{course}', 'show')->withoutMiddleware('auth:sanctum');

    Route::get('/{course}/lessons', 'getLessons')->withoutMiddleware('auth:sanctum');

    Route::get('/{course}/lessons/{courseLesson}', 'getLessonDetail')->withoutMiddleware('auth:sanctum')->scopeBindings();


    Route::middleware('ability:manage-course')->group(function () {
        Route::post('/', 'store');

        Route::post('/{course}', 'update');

        Route::delete('/{course}', 'destroy');

        Route::post('/{course}/lessons', 'storeLesson');

        Route::post('/{course}/lessons/{courseLesson}', 'updateLesson')->scopeBindings();

        Route::delete('/{course}/lessons/{courseLesson}', 'destroyLesson')->scopeBindings();
    });

});
