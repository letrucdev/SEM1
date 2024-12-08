<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    // Thêm bài viết
    public function store(Request $request)
    {
        $request->validate([
            'post_type' => 'required|string',
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'description' => 'required|string',
            'thumbnail_path' => 'required|string',
        ]);

        // Tạo bài viết mới
        $post = Post::create([
            'user_id' => Auth::id(),
            'post_type' => $request->post_type,
            'title' => $request->title,
            'content' => $request->content,
            'description' => $request->description,
            'thumbnail_path' => $request->thumbnail_path,
        ]);

        return response()->json($post, 201);
    }

    // Cập nhật bài viết
    public function update(Request $request, $id)
    {
        $request->validate([
            'post_type' => 'required|string',
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'description' => 'required|string',
            'thumbnail_path' => 'required|string',
        ]);

        $post = Post::findOrFail($id);

        // Kiểm tra quyền sở hữu
        if ($post->user_id !== Auth::id()) {
            return response()->json(['message' => 'You do not have permission to update this post'], 403);
        }

        // Cập nhật bài viết
        $post->update($request->all());

        return response()->json($post, 200);
    }

    // Xóa bài viết
    public function destroy($id)
    {
        $post = Post::findOrFail($id);

        // Kiểm tra quyền sở hữu
        if ($post->user_id !== Auth::id()) {
            return response()->json(['message' => 'You do not have permission to delete this post'], 403);
        }

        $post->delete();

        return response()->json(['message' => 'Post deleted successfully'], 200);
    }

    // Upload Thumbnail
    public function uploadThumbnail(Request $request)
    {
        $request->validate([
            'thumbnail' => 'required|image|mimes:jpeg,png,jpg|max:2048', // Chỉ cho phép file ảnh
        ]);

        // Lưu file vào thư mục 'thumbnails' trong storage
        $filePath = $request->file('thumbnail')->store('thumbnails', 'public');

        // Trả về đường dẫn file đã upload
        return response()->json([
            'message' => 'Thumbnail uploaded successfully',
            'thumbnail_url' => asset('storage/' . $filePath),
        ], 200);
    }

    // Upload Video
    public function uploadVideo(Request $request)
    {
        $request->validate([
            'video' => 'required|file|mimes:mp4,avi,mkv|max:20480', // Chỉ cho phép file video
        ]);

        // Lưu file vào thư mục 'videos' trong storage
        $filePath = $request->file('video')->store('videos', 'public');

        // Trả về đường dẫn file đã upload
        return response()->json([
            'message' => 'Video uploaded successfully',
            'video_url' => asset('storage/' . $filePath),
        ], 200);
    }
}
