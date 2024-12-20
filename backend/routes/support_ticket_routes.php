<?php


use App\Http\Controllers\SupportTicketController;


Route::prefix('support-tickets')->controller(SupportTicketController::class)->group(function () {

    Route::get('/', 'index')->can('viewAny', \App\Models\SupportTicket::class);
    Route::delete('/{supportTicket}', 'destroy')->can('delete', \App\Models\SupportTicket::class);

    Route::post('/', 'store')->middleware('throttle:ticket')->withoutMiddleware('auth:sanctum');
});
