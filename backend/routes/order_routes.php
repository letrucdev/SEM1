<?php

use App\Http\Controllers\OrderController;

Route::prefix('orders')->controller(OrderController::class)->group(function () {
    Route::get('/', 'index');

    Route::get('/users-orders', 'getUserOrders')->can('viewAny', \App\Models\Order::class);

    Route::get('/statuses', 'getOrderStatuses');

    Route::post('/{cart}', 'store');

    Route::patch('/cancel/{order}', 'cancelOrder')->can('cancel', \App\Models\Order::class);;

    Route::patch('/{orderId}/status', 'updateOrderStatus')->can('viewAny', \App\Models\Order::class);;
});
