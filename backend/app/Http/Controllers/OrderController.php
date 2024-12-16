<?php

namespace App\Http\Controllers;

use App\Enums\OrderStatus;
use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderProduct;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Symfony\Component\HttpFoundation\Response;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $request->validate([
            'page' => 'nullable|integer|min:0',
            'pageSize' => 'nullable|integer|min:1|max:100',
        ]);

        try {
            $page = $request->query('page', 0);
            $pageSize = $request->query('pageSize', 10);
            $orders = Order::query();

            $ordersCount = $orders->count();
            $ordersWithIndex = $orders->offset($page * $pageSize)->limit($pageSize)
                ->orderBy('created_at', 'desc')
                ->withSum('orderProducts as totalPrice', DB::raw('price * quantity'))
                ->get()
                ->map(function ($order, $index) use ($page, $pageSize) {
                    $order->order = $page * $pageSize + $index + 1;
                    return $order;
                });

            return response()->json(['message' => 'Orders retrieved successfully', 'total' => $ordersCount, 'data' => $ordersWithIndex]);
        } catch (\Exception) {
            return response()->json(['message' => 'An error occurred while retrieving the orders'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function store(Request $request, Cart $cart)
    {
        $request->validate([
            'delivery_address' => 'required|string|min:5',
            'products' => 'required|array|min:1|max:100',
            'products.*' => 'required|uuid|exists:App\Models\CartProduct,product_id',
        ]);

        try {
            DB::beginTransaction();

            $order = \Auth::user()->orders()->create([
                'delivery_address' => $request->delivery_address,
            ]);

            $cartProducts = $cart->cartProducts()->whereIn('product_id', $request->products)->with('product')->get();

            foreach ($cartProducts as $cartProduct) {
                $detailProduct = $cartProduct->product;

                if ($cartProduct->quantity > $detailProduct->stock) {
                    DB::rollBack();

                    return response()->json(['message' => 'Not enough stock for product.', 'data' => $detailProduct], Response::HTTP_BAD_REQUEST);
                }

                $order->orderProducts()->create([
                    'product_id' => $detailProduct->id,
                    'quantity' => $cartProduct->quantity,
                    'price' => $detailProduct->price,
                ]);

                $detailProduct->decrement('stock', $cartProduct->quantity);
                $cartProduct->delete();
            }

            DB::commit();

            return response()->json(['message' => 'Order created successfully', 'data' => $order]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'An error occurred while creating the order'], Response::HTTP_INTERNAL_SERVER_ERROR);
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
            return response()->json(['message' => 'An error occurred while cancelling the order'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function getUserOrders(Request $request)
    {
        $request->validate([
            'page' => 'nullable|integer|min:0',
            'pageSize' => 'nullable|integer|min:1|max:100',
        ]);

        try {
            $page = $request->query('page', 0);
            $pageSize = $request->query('pageSize', 10);

            $userOrders = Order::query();
            $ordersCount = $userOrders->count();
            $orders = $userOrders->limit($pageSize)->offset($page * $pageSize)->get();

            return response()->json(['message' => 'User orders retrieved successfully', 'total' => $ordersCount, 'data' => $orders]);
        } catch (\Exception) {
            return response()->json(['message' => 'An error occurred while fetching user orders'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function getOrderStatuses()
    {
        $orderStatuses = [];

        foreach (OrderStatus::cases() as $value) {
            $orderStatuses[$value->name] = $value->value;
        }

        return response()->json(['message' => 'Order statuses retrieved successfully', 'data' => $orderStatuses]);
    }

    public function updateOrderStatus(Order $order, Request $request)
    {
        $request->validate([
            'order_status' => ['required', Rule::enum(OrderStatus::class)->except([OrderStatus::Cancelled])],
        ]);

        try {
            $order->update([
                'order_status' => $request->order_status,
            ]);

            return response()->json(['message' => 'Order status updated successfully', 'data' => $order->refresh()]);
        } catch (\Exception) {
            return response()->json(['message' => 'An error occurred while updating the order status'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
