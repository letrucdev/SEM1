<?php

namespace App\Http\Controllers;

use App\Enums\OrderStatus;
use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderProduct;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        try {
            $page = $request->query('page', 0);
            $pageSize = $request->query('pageSize', 10);
            $oders = Order::offset($page * $pageSize)->limit($pageSize)
                ->withSum('orderProducts as totalPrice', DB::raw('price * quantity'))
                ->get();

            return response()->json(['message' => 'Orders retrieved successfully', 'data' => $oders]);
        } catch (\Exception) {
            return response()->json(['error' => 'An error occurred while retrieving the orders'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function store(Request $request, Cart $cart)
    {
        $request->validate([
            'delivery_address' => 'required|string|min:5',
            'products' => 'required|array|min:1',
            'products.*' => 'required|uuid|exists:products,id',
        ]);

        try {
            DB::beginTransaction();

            $order = \Auth::user()->orders()->create([
                'delivery_address' => $request->delivery_address,
            ]);

            foreach ($request->products as $productId) {
                $cartProduct = $cart->cartProducts()->whereProductId($productId)->with('product')->firstOrFail();
                $product = $cartProduct->product;

                if ($cartProduct->quantity > $product->stock) {
                    DB::rollBack();
                    return response()->json(['error' => 'Not enough stock for product.', 'data' => $product], Response::HTTP_BAD_REQUEST);
                }

                $order->orderProducts()->create([
                    'product_id' => $product->id,
                    'quantity' => $cartProduct->quantity,
                    'price' => $product->price,
                ]);

                $product->decrement('stock', $cartProduct->quantity);
                $cartProduct->delete();
            }

            DB::commit();

            return response()->json(['message' => 'Order created successfully', 'data' => $order]);
        } catch (\Exception) {
            DB::rollBack();
            return response()->json(['error' => 'An error occurred while creating the order'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function cancelOrder(Order $order)
    {
        try {

            if ($order->order_status !== OrderStatus::Processing->name) {
                return response()->json(['error' => 'Cannot cancel an order in the current state.'], Response::HTTP_BAD_REQUEST);
            }

            return DB::transaction(function () use ($order) {
                $order->update([
                    'order_status' => OrderStatus::Cancelled,
                ]);

                $order->orderProducts()->with('product')->chunkMap(function (OrderProduct $orderProduct) {
                    $orderProduct->product->increment('stock', $orderProduct->quantity);
                });

                return response()->json(['message' => 'Order cancelled successfully', 'data' => $order->refresh()]);
            });
        } catch (\Exception) {
            return response()->json(['error' => 'An error occurred while cancelling the order'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
