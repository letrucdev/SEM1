<?php

use App\Http\Controllers\CartController;


Route::prefix('cart')->controller(CartController::class)->group(function () {
    Route::get('/', 'index');

    Route::post('/', 'store');

    Route::get('/products', 'getProductsInCart');

    Route::put('/{product}', 'updateCartProduct');

    Route::delete('/', 'destroyCart');

    Route::delete('/{product}', 'destroyCartProduct');
});
