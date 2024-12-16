<?php

use App\Http\Controllers\OrderController;

Route::prefix('orders')->controller(OrderController::class)->group(function () {
    Route::get('/', 'index');

    Route::get('/users-orders', 'getUserOrders');

    Route::get('/statuses', 'getOrderStatuses');

    Route::post('/{cart}', 'store');

    Route::patch('/cancel/{order}', 'cancelOrder');

    Route::patch('/{order}/status', 'updateOrderStatus');
});
