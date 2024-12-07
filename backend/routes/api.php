<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::middleware('auth:sanctum')->group(function () {
    Route::prefix('products')->group(function () {
        Route::get('/', [ProductController::class, 'index'])->middleware('ability:get-product');

        Route::get('/{product}', [ProductController::class, 'show']);

        Route::post('/', [ProductController::class, 'store'])->middleware('ability:create-product');

        Route::put('/{product}', [ProductController::class, 'update']);

        Route::delete('/{product}', [ProductController::class, 'destroy']);

        Route::delete('/images/{image}', [ProductController::class, 'destroyImage']);

        Route::post('/{product}/images', [ProductController::class, 'uploadImage']);
    });
});


Route::post('/login', \App\Http\Controllers\LoginController::class);
Route::post('/register', \App\Http\Controllers\RegisterController::class);




