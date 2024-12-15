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
            $carts = Auth::user()->cart();
            if (!$carts->count()) $carts->create();

            return response()->json([
                'message' => 'Cart retrieved successfully.',
                'data' => $carts->withCount('cartProducts')->first(),
            ]);
        } catch (\Exception) {
            return response()->json([
                'message' => 'An error occurred while retrieving the cart.',
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|uuid|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        try {
            return DB::transaction(function () use ($request) {
                $cart = Auth::user()->cart()->first();
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
                'message' => 'An error occurred while adding the product to the cart.',
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }


    public function getProductsInCart(Request $request)
    {
        /* $request->validate([
             'page' => 'nullable|integer|min:0',
             'pageSize' => 'nullable|integer|min:1|max:100',
         ]);*/

        try {
            /* $page = $request->query('page', 0);
             $pageSize = $request->query('pageSize', 10);*/
            $products = Auth::user()->cart->products();

            $productsTotal = $products->count();

            return response()->json([
                'message' => 'Products retrieved successfully.',
                'total' => $productsTotal,
                'data' => $products->with(['productCategory', 'productImages'])->get(),
            ]);
        } catch (\Exception) {
            return response()->json([
                'message' => 'An error occurred while retrieving the products in the cart . ',
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function destroyCart()
    {
        try {
            Auth::user()->cart()->delete();

            return response()->json([
                'message' => 'Cart deleted successfully . ',
            ]);
        } catch (\Exception) {
            return response()->json([
                'message' => 'An error occurred while deleting the cart . ',
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function updateCartProduct(Product $product, Request $request)
    {
        $request->validate([
            'quantity' => 'required | integer | min:1',
        ]);

        try {
            $cart = Auth::user()->cart()->first();

            $cart->cartProducts()->updateOrCreate(
                ['product_id' => $product->id],
                ['quantity' => $product->stock <= $request->quantity ? $product->stock : $request->quantity]
            );

            return response()->json([
                'message' => 'Cart product updated successfully . ',
                'data' => $cart->refresh(),
            ]);

        } catch (\Exception) {
            return response()->json([
                'message' => 'An error occurred while updating the cart product . ',
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function destroyCartProduct(Product $product)
    {
        try {
            $cart = Auth::user()->cart()->first();
            $cartProduct = $cart->cartProducts()->whereProductId($product->id)->first();
            $cartProduct->delete();

            return response()->json([
                'message' => 'Product removed from the cart . ',
                'data' => $cart->refresh(),
            ]);
        } catch (\Exception) {
            return response()->json([
                'message' => 'An error occurred while removing the product from the cart . ',
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
