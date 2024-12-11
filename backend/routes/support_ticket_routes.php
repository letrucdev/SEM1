<?php


use App\Http\Controllers\SupportTicketController;


Route::prefix('support-tickets')->controller(SupportTicketController::class)->group(function () {

    Route::middleware('ability:manage-ticket')->group(function () {
        Route::get('/', 'index');
        Route::delete('/{supportTicket}', 'destroy');
    });

    Route::post('/', 'store')->middleware('throttle:ticket')->withoutMiddleware('auth:sanctum');
});
