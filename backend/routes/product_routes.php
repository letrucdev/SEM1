<?php

use App\Http\Controllers\ProductController;


Route::prefix('products')->controller(ProductController::class)->group(function () {
    Route::get('/categories', 'getProductCategories');

    Route::middleware('ability:manage-product')->prefix('category')->group(function () {
        Route::post('/', 'storeProductCategory');

        Route::put('/{productCategory}', 'updateProductCategory');

        Route::delete('/{productCategory}', 'destroyProductCategory');
    });

    Route::get('/', 'index');

    Route::get('/{product}', 'show');

    Route::post('/{product}/rate', 'rateProduct');

    Route::middleware('ability:manage-product')->group(function () {
        Route::post('/', 'store');

        Route::post('/{product}', 'update');

        Route::delete('/{product}', 'destroy');

        Route::delete('/{product}/{imageId}', 'destroyProductImage');
    });
});
