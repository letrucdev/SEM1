<?php

namespace App\Http\Controllers;

use App\Models\ProductImage;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $page = $request->query('page', 0);
        $pageSize = $request->query('pageSize', 10);
        $category = $request->query('category');
        $inStock = $request->boolean('inStock');
        $fromPrice = $request->query('fromPrice');
        $toPrice = $request->query('toPrice');

        $products = Product::offset($page * $pageSize)->limit($pageSize)
            ->when($category, function (Builder $query, string $category) {
                $query->where('category', $category);
            })
            ->when($inStock, function (Builder $query) {
                $query->where('stock', '>', '0');
            })
            ->when($fromPrice, function (Builder $query, float $fromPrice) {
                $query->where('price', '>=', $fromPrice);
            })
            ->when($toPrice, function (Builder $query, float $toPrice) {
                $query->where('price', '<=', $toPrice);
            })
            ->get();

        return response()->json([
            'message' => 'List of products',
            'data' => $products
        ]);
    }

    public function show(Product $product)
    {
        return response()->json([
                'message' => 'Product retrieved successfully',
                'data' => $product->loadAvg('productRates', 'star')]
        );
    }

    public function store(Request $request)
    {
        $product = Product::create([
            'name' => $request->name,
            'price' => $request->price,
            'stock' => $request->stock,
            'category' => $request->category,
        ]);

        return response()->json([
            'message' => 'Product created successfully',
            'data' => $product,
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
            'category' => 'required|string|max:255',
        ]);

        $product->update($request->all());

        return response()->json([
            'message' => 'Product updated successfully',
            'data' => $product,
        ]);
    }

    public function destroy(Product $product)
    {
        $product->delete();

        return response()->json([
            'message' => 'Product deleted successfully',
        ]);
    }

    public function destroyImage(ProductImage $image)
    {
        $image->delete();

        return response()->json([
            'message' => 'Image deleted successfully',
        ]);
    }

    public function uploadImage(Request $request, Product $product)
    {
        $request->validate([
            'images.*' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        $uploadedImages = [];

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('product_images', 'public');

                $uploadedImages[] = $product->productImages()->create([
                    'image_path' => $path
                ]);
            }
        }

        return response()->json([
            'message' => 'Images uploaded successfully',
            'data' => $uploadedImages
        ], 201);
    }
}
