<?php

use App\Http\Controllers\CartController;


Route::prefix('cart')->controller(CartController::class)->group(function () {
    Route::get('/', 'index');

    Route::post('/', 'store');

    Route::put('/{cart}/{product}', 'updateCartProduct');

    Route::delete('/{cart}', 'destroyCart');

    Route::delete('/{cart}/{product}', 'destroyCartProduct')->scopeBindings();
});
