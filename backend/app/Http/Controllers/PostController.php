<?php

namespace App\Http\Controllers;

use App\Enums\PostType;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Symfony\Component\HttpFoundation\Response;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $request->validate([
            'page' => 'nullable|integer|min:0',
            'pageSize' => 'nullable|integer|min:1|max:100',
            'postType' => ['nullable', 'string', Rule::enum(PostType::class)],
            'search' => 'nullable|string',
        ]);

        try {
            $page = $request->query('page', 0);
            $pageSize = $request->query('pageSize', 10);
            $postType = $request->query('postType');
            $search = $request->query('search');

            $postsQuery = Post::query()
                ->when($postType, function ($query) use ($postType) {
                    $query->where('post_type', $postType);
                })
                ->when($search, function ($query, $search) {
                    $query
                        ->where('title', 'LIKE', '%' . $search . '%')
                        ->orWhere('content', 'LIKE', '%' . $search . '%')
                        ->orWhere('description', 'LIKE', '%' . $search . '%');
                });

            $postCount = $postsQuery->count();
            $posts = $postsQuery->limit($pageSize)->offset($page * $pageSize)->get()->map(function ($post, $index) use ($page, $pageSize) {
                $post->order = $page * $pageSize + $index + 1;
                $post->test = "123";
                return $post;
            });

            return response()->json(['message' => 'Posts retrieved successfully.', 'total' => $postCount, 'data' => $posts]);

        } catch (\Exception) {
            return response()->json(['message' => 'An error occurred while retrieving posts.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'description' => 'required|string|max:255',
            'postType' => ['required', 'string', Rule::enum(PostType::class)],
            'thumbnail' => ['required', 'file', 'image', 'max:10240'],
        ]);

        try {
            $title = $request->get('title');
            $content = $request->get('content');
            $description = $request->get('description');
            $postType = $request->get('postType');
            $thumbnailPath = $request->file('thumbnail')->store('thumbnails/posts', 'public');

            $post = \Auth::user()->posts()->create([
                'title' => $title,
                'content' => $content,
                'description' => $description,
                'post_type' => $postType,
                'thumbnail_path' => $thumbnailPath,
            ]);

            return response()->json(['message' => 'Post created successfully.', 'data' => $post]);
        } catch (\Exception) {
            return response()->json(['message' => 'An error occurred while creating post.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function update(Request $request, Post $post)
    {
        $request->validate([
            'title' => 'nullable|string|max:255',
            'content' => 'nullable|string',
            'description' => 'nullable|string|max:255',
            'postType' => ['nullable', 'string', Rule::enum(PostType::class)],
            'thumbnail' => ['nullable', 'file', 'image', 'max:10240'],
        ]);

        try {
            DB::beginTransaction();

            $title = $request->get('title', $post->title);
            $content = $request->get('content', $post->content);
            $description = $request->get('description', $post->description);
            $postType = $request->get('postType', $post->post_type);
            $thumbnailFile = $request->file('thumbnail');
            $oldThumbnailPath = $post->thumbnail_path;
            $thumbnailPath = $thumbnailFile ?
                $request->file('thumbnail')->store('thumbnails/posts', 'public') :
                $oldThumbnailPath;

            $post->update([
                'title' => $title,
                'content' => $content,
                'description' => $description,
                'post_type' => $postType,
                'thumbnail_path' => $thumbnailPath,
            ]);

            if ($thumbnailFile) {
                Storage::disk('public')->delete($oldThumbnailPath);
            }

            DB::commit();

            return response()->json(['message' => 'Post updated successfully.', 'data' => $post]);

        } catch (\Throwable) {
            DB::rollBack();
            return response()->json(['message' => 'An error occurred while retrieving post.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function destroy(Post $post)
    {
        try {
            DB::beginTransaction();

            $post->delete();
            Storage::disk('public')->delete($post->thumbnail_path);

            DB::commit();

            return response()->json(['message' => 'Post deleted successfully.']);

        } catch (\Throwable) {
            DB::rollBack();
            return response()->json(['message' => 'An error occurred while deleting post.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function show(Post $post)
    {
        return response()->json(['message' => 'Post retrieved successfully.', 'data' => $post]);
    }
}
