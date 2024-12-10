<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class CartController extends Controller
{
    public function index()
    {
        try {
            $cart = Auth::user()->cart()->first();

            return response()->json([
                'message' => 'Cart retrieved successfully.',
                'data' => $cart,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'An error occurred while retrieving the cart.',
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function store(Request $request, Cart $cart)
    {
        $request->validate([
            'product_id' => 'required|uuid|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        try {
            return DB::transaction(function () use ($request, $cart) {

                $cartProduct = $cart->cartProducts()->firstOrCreate(
                    ['product_id' => $request->product_id],
                    ['quantity' => 0]
                );

                $product = Product::find($request->product_id, 'stock');

                if ($product->stock <= $request->quantity + $cartProduct->quantity) {
                    $cartProduct->update([
                        'quantity' => $product->stock
                    ]);
                } else {
                    $cartProduct->increment('quantity', $request->quantity);
                }

                return response()->json([
                    'message' => 'Product added to the cart.',
                    'data' => $cart->refresh(),
                ]);
            });
        } catch (\Exception) {
            return response()->json([
                'error' => 'An error occurred while adding the product to the cart.',
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function destroyCart(Cart $cart)
    {
        try {
            $cart->delete();

            return response()->json([
                'message' => 'Cart deleted successfully.',
            ]);
        } catch (\Exception) {
            return response()->json([
                'error' => 'An error occurred while deleting the cart.',
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function updateCartProduct(Cart $cart, Product $product, Request $request)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        try {

            $cart->cartProducts()->updateOrCreate(
                ['product_id' => $product->id],
                ['quantity' => $product->stock <= $request->quantity ? $product->stock : $request->quantity]
            );

            return response()->json([
                'message' => 'Cart product updated successfully.',
                'data' => $cart->refresh(),
            ]);

        } catch (\Exception) {
            return response()->json([
                'message' => 'An error occurred while updating the cart product.',
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function destroyCartProduct(Cart $cart, Product $product)
    {
        try {
            $cartProduct = $cart->cartProducts()->whereProductId($product->id)->first();
            $cartProduct->delete();

            return response()->json([
                'message' => 'Product removed from the cart.',
                'data' => $cart->refresh(),
            ]);
        } catch (\Exception) {
            return response()->json([
                'error' => 'An error occurred while removing the product from the cart.',
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
