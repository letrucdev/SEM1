<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use Symfony\Component\HttpFoundation\Response;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

/*Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});*/


Route::middleware('auth:sanctum')->group(function () {
    Route::prefix('products')->controller(ProductController::class)->group(function () {
        Route::get('/categories', 'getProductCategories');

        Route::middleware('ability:manage-product')->prefix('category')->missing(function () {
            return response()->json([
                'message' => 'Product category not found',
            ], Response::HTTP_NOT_FOUND);
        })->group(function () {
            Route::post('/', 'storeProductCategory');

            Route::put('/{productCategory}', 'updateProductCategory');

            Route::delete('/{productCategory}', 'destroyProductCategory');
        });

        Route::missing(function () {
            response()->json([
                'message' => 'Product not found',
            ], Response::HTTP_NOT_FOUND);
        })->group(function () {

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
    });
});


Route::post('/login', \App\Http\Controllers\LoginController::class);
Route::post('/register', \App\Http\Controllers\RegisterController::class);




