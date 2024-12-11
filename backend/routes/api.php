<?php

use App\Models\Cart;
use App\Models\Course;
use App\Models\CourseLesson;
use App\Models\Order;
use App\Models\Product;
use App\Models\ProductCategory;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
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

require __DIR__ . '/auth_routes.php';

Route::middleware('auth:sanctum')->missing(function (Request $request, Throwable $e) {
    if (!$e instanceof ModelNotFoundException) throw $e;

    $modelName = $e->getModel();
    return match ($modelName) {
        Cart::class => response()->json(['message' => 'Cart not found.'], Response::HTTP_NOT_FOUND),
        Product::class => response()->json(['message' => 'Product not found.'], Response::HTTP_NOT_FOUND),
        ProductCategory::class => response()->json(['message' => 'Product category not found.'], Response::HTTP_NOT_FOUND),
        Order::class => response()->json(['message' => 'Order not found.'], Response::HTTP_NOT_FOUND),
        Course::class => response()->json(['message' => 'Course not found.'], Response::HTTP_NOT_FOUND),
        CourseLesson::class => response()->json(['message' => 'Lesson not found.'], Response::HTTP_NOT_FOUND),
        default => response()->json(['message' => $modelName . ' not found.'], Response::HTTP_NOT_FOUND)
    };
})->group(function () {
    require __DIR__ . '/product_routes.php';
    require __DIR__ . '/cart_routes.php';
    require __DIR__ . '/order_routes.php';
    require __DIR__ . '/course_routes.php';
});









