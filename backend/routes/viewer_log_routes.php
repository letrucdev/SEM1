<?php


use App\Http\Controllers\ViewerLogController;

Route::prefix('viewer-logs')->controller(ViewerLogController::class)->group(function () {
    Route::get('/count', 'count');
    Route::post('/', 'store');
});
