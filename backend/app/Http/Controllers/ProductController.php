<?php

namespace App\Http\Controllers;

use App\Models\ProductCategory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Symfony\Component\HttpFoundation\Response;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $request->validate([
            'page' => 'nullable|integer|min:0',
            'pageSize' => 'nullable|integer|min:1|max:100',
            'category' => 'nullable|string|max:255',
            'inStock' => 'nullable|boolean',
            'fromPrice' => 'nullable|numeric|min:0',
            'toPrice' => 'nullable|numeric|min:0',
            'sortBy' => ['nullable', 'string',
                Rule::in(
                    [
                        'price-asc', 'price-desc',
                        'created_at-asc', 'created_at-desc',
                        'product_rates_avg_star-desc', 'product_rates_avg_star-asc'
                    ])
            ],
        ]);

        $page = $request->query('page', 0);
        $pageSize = $request->query('pageSize', 10);
        $category = $request->query('category');
        $inStock = $request->boolean('inStock');
        $fromPrice = $request->query('fromPrice');
        $toPrice = $request->query('toPrice');
        $sortBy = $request->query('sortBy');

        try {
            $products = Product::offset($page * $pageSize)->limit($pageSize)
                ->when($category, function (Builder $query, string $category) {
                    $query->whereHas('productCategory', function (Builder $query) use ($category) {
                        $query->where('slug', $category);
                    });
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
                ->when($sortBy, function (Builder $query, string $sortBy) {
                    list($column, $direction) = explode('-', $sortBy);
                    $query->orderBy($column, $direction);
                })
                ->withAvg('productRates', 'star')
                ->with(['productImages', 'productCategory'])
                ->get();

            return response()->json([
                'message' => 'List of products',
                'data' => $products
            ]);
        } catch (\Exception) {
            return response()->json([
                'message' => 'An error occurred while retrieving products',
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

    }

    public function show(Product $product)
    {
        return response()->json([
                'message' => 'Product retrieved successfully',
                'data' => $product->loadAvg('productRates', 'star')->load(['productImages', 'productCategory'])]
        );
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|integer|min:0',
            'stock' => 'required|integer|min:0',
            'product_category_id' => 'required|uuid|exists:product_categories,id',
            'images' => 'required|array|min:1',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:1024'
        ]);


        try {
            return DB::transaction(function () use ($request) {
                $product = Product::create([
                    'name' => $request->name,
                    'price' => $request->price,
                    'stock' => $request->stock,
                    'product_category_id' => $request->product_category_id,
                ]);

                foreach ($request->file('images') as $image) {
                    $path = $image->store('product_images', 'public');
                    $product->productImages()->create([
                        'image_path' => $path
                    ]);
                }

                return response()->json([
                    'message' => 'Product created successfully',
                    'data' => $product->loadAvg('productRates', 'star')->load(['productImages', 'productCategory'])
                ]);
            });
        } catch (\Exception) {
            return response()->json([
                'message' => 'An error occurred while creating the product',
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function update(Request $request, Product $product)
    {
        $request->validate([
            'name' => 'nullable|string|max:255',
            'price' => 'nullable|numeric',
            'stock' => 'nullable|integer',
            'product_category_id' => 'nullable|uuid|exists:product_categories,id',
            'images' => 'nullable|array|min:1',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:1024'
        ]);

        try {
            return DB::transaction(function () use ($request, $product) {
                $product->update([
                    'name' => $request->input('name', $product->name),
                    'price' => $request->input('price', $product->price),
                    'stock' => $request->input('stock', $product->stock),
                    'product_category_id' => $request->input('product_category_id', $product->product_category_id),
                ]);

                if ($request->hasFile('images')) {
                    foreach ($request->file('images') as $image) {
                        $path = $image->store('product_images', 'public');
                        $product->productImages()->create([
                            'image_path' => $path
                        ]);
                    }
                }

                return response()->json([
                    'message' => 'Product updated successfully',
                    'data' => $product->loadAvg('productRates', 'star')->load(['productImages', 'productCategory'])->refresh(),
                ]);
            });

        } catch (\Exception) {
            return response()->json([
                'message' => 'An error occurred while updating the product',
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function destroy(Product $product)
    {
        try {
            $productImages = $product->productImages->pluck('image_path');
            $product->delete();
            Storage::disk('public')->delete($productImages->toArray());

            return response()->json([
                'message' => 'Product deleted successfully',
            ]);
        } catch (\Exception) {
            return response()->json([
                'error' => 'An error occurred while deleting the product',
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function destroyProductImage(Product $product, string $imageId)
    {
        try {
            $productImage = $product->productImages()->findOrFail($imageId);
            Storage::disk('public')->delete($productImage->image_path);
            $productImage->delete();


            return response()->json([
                'message' => 'Image deleted successfully',
                'data' => $product->loadAvg('productRates', 'star')->load(['productCategory', 'productImages']),
            ]);
        } catch (\Exception) {
            return response()->json([
                'error' => 'An error occurred while deleting the image',
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function getProductCategories()
    {
        return response()->json([
            'message' => 'List of product categories',
            'data' => ProductCategory::all()
        ]);
    }

    public function storeProductCategory(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:product_categories,name',
        ]);

        try {
            ProductCategory::create([
                'name' => $request->name,
                'slug' => Str::slug($request->name)
            ]);

            return response()->json([
                'message' => 'Product category created successfully',
                'data' => ProductCategory::all()
            ]);
        } catch (\Exception) {
            return response()->json([
                'message' => 'An error occurred while creating the product category',
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function updateProductCategory(Request $request, ProductCategory $productCategory)
    {
        $request->validate([
            'name' => "nullable|string|max:255|unique:product_categories,name,slug",
        ]);

        try {
            $productCategory->update([
                'name' => $request->input('name', $productCategory->name),
                'slug' => $request->name ? Str::slug($request->name) : $productCategory->slug,
            ]);

            return response()->json([
                'message' => 'Product category updated successfully',
                'data' => ProductCategory::all()
            ]);
        } catch (\Exception) {
            return response()->json([
                'error' => 'An error occurred while updating the product category',
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function destroyProductCategory(ProductCategory $productCategory)
    {
        try {
            $productCategory->delete();

            return response()->json([
                'message' => 'Product category deleted successfully',
                'data' => ProductCategory::all()
            ]);
        } catch (\Exception) {
            return response()->json([
                'error' => 'An error occurred while deleting the product category',
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function rateProduct(Request $request, Product $product)
    {
        $request->validate([
            'star' => 'required|integer|min:1|max:5',
        ]);

        try {
            $product->productRates()->updateOrInsert(['user_id' => \Auth::id()], ['star' => $request->star]);

            return response()->json([
                'message' => 'Rate product successfully',
                'data' => $product->loadAvg('productRates', 'star')
            ]);
        } catch (\Exception) {
            return response()->json([
                'error' => 'An error occurred while rating the product',
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
