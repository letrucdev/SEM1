<?php

use App\Http\Controllers\OrderController;

Route::prefix('orders')->controller(OrderController::class)->group(function () {
    Route::get('/', 'index');

    Route::post('/{cart}', 'store');

    Route::patch('/cancel/{order}', 'cancelOrder');
});
