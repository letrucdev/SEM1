<?php


use App\Http\Controllers\CourseController;

Route::prefix('courses')->controller(CourseController::class)->group(function () {
    Route::get('/', 'index');

    Route::get('/{course}', 'show');

    Route::get('/{course}/lessons', 'getLessons');


    Route::middleware('ability:manage-course')->group(function () {
        Route::post('/', 'store');

        Route::post('/{course}', 'update');

        Route::delete('/{course}', 'destroy');

        Route::post('/{course}/lessons', 'storeLesson');

        Route::post('/{course}/lessons/{courseLesson}', 'updateLesson')->scopeBindings();

        Route::delete('/{course}/lessons/{courseLesson}', 'destroyLesson')->scopeBindings();
    });

});
