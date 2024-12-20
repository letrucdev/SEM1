<?php

use App\Http\Controllers\ProductController;


Route::prefix('products')->controller(ProductController::class)->group(function () {

    Route::withoutMiddleware('auth:sanctum')->group(function () {
        Route::get('/', 'index');
        Route::get('/categories', 'getProductCategories');
        Route::get('/{product}', 'show');
    });

    Route::prefix('category')->group(function () {
        Route::post('/', 'storeProductCategory')->can('create', \App\Models\Product::class);

        Route::put('/{productCategory}', 'updateProductCategory')->can('update', \App\Models\Product::class);

        Route::delete('/{productCategory}', 'destroyProductCategory')->can('update', \App\Models\Product::class);
    });


    Route::post('/{product}/rate', 'rateProduct');

    Route::post('/', 'store')->can('create', \App\Models\Product::class);

    Route::post('/{product}', 'update')->can('update', \App\Models\Product::class);;

    Route::delete('/{product}', 'destroy')->can('delete', \App\Models\Product::class);;

    Route::delete('/{product}/{imageId}', 'destroyProductImage')->can('delete', \App\Models\Product::class);
});
