<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\CourseLesson;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response;

class CourseController extends Controller
{
    public function index(Request $request)
    {
        $request->validate([
            'page' => 'nullable|integer|min:0',
            'pageSize' => 'nullable|integer|min:1|max:100',
            'search' => 'nullable|string|max:255'
        ]);

        $page = $request->query('page', 0);
        $pageSize = $request->query('pageSize', 10);
        $search = $request->query('search');

        try {
            $courses = Course::query()
                ->when($search, function (Builder $query, string $search) {
                    $query
                        ->where('title', 'LIKE', '%' . $search . '%')
                        ->orWhere('description', 'LIKE', '%' . $search . '%');
                });

            $coursesCount = $courses->count();

            return response()->json(['message' => 'Courses retrieved successfully', 'total' => $coursesCount, 'data' => $courses->get()]);
        } catch (\Exception) {
            return response()->json(['error' => 'An error occurred while retrieving the courses'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function show(Course $course)
    {
        return response()->json([
            'message' => 'Course retrieved successfully',
            'data' => $course->load('courseLessons')
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'thumbnail' => 'required|file|image|max:5120'
        ]);

        try {
            $thumbnailPath = $request->file('thumbnail')->store('thumbnails/courses', 'public');
            $course = Auth::user()->courses()->create([
                'title' => $request->title,
                'description' => $request->description,
                'thumbnail_path' => $thumbnailPath
            ]);

            return response()->json([
                'message' => 'Course created successfully',
                'data' => $course
            ]);
        } catch (\Exception) {
            return response()->json(['error' => 'An error occurred while creating the course'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function update(Request $request, Course $course)
    {
        $request->validate([
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string|max:255',
            'thumbnail' => 'nullable|file|image|max:5120'
        ]);

        try {
            DB::beginTransaction();

            $title = $request->input('title', $course->title);
            $description = $request->input('description', $course->description);
            $thumbnailFile = $request->file('thumbnail');
            $oldThumbnailPath = $course->thumbnail_path;
            $thumbnailPath = $thumbnailFile ?
                $request->file('thumbnail')->store('thumbnails/courses', 'public') :
                $oldThumbnailPath;

            $course->update([
                'title' => $title,
                'description' => $description,
                'thumbnail_path' => $thumbnailPath
            ]);

            if ($thumbnailFile) {
                Storage::disk('public')->delete($oldThumbnailPath);
            }

            DB::commit();

            return response()->json([
                'message' => 'Course updated successfully',
                'data' => $course->refresh()
            ]);
        } catch (\Throwable) {
            DB::rollBack();
            return response()->json(['error' => 'An error occurred while updating the course'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function destroy(Course $course)
    {
        try {
            DB::beginTransaction();

            $lessonVideoPaths = $course->courseLessons()->pluck('video_path');
            $thumbnailPath = $course->thumbnail_path;
            $course->delete();

            Storage::disk('public')->delete($lessonVideoPaths->toArray());
            Storage::disk('public')->delete($thumbnailPath);

            DB::commit();

            return response()->json([
                'message' => 'Course deleted successfully',
            ]);
        } catch (\Exception) {
            DB::rollBack();
            return response()->json(['error' => 'An error occurred while deleting the course'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function getLessons(Course $course)
    {
        try {
            $courseLessons = $course->courseLessons()->get();

            return response()->json([
                'message' => 'Course lessons retrieved successfully',
                'data' => $courseLessons
            ]);
        } catch (\Exception) {
            return response()->json(['error' => 'An error occurred while retrieving the course lessons'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function storeLesson(Request $request, Course $course)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'nullable|string',
            'duration' => 'required|integer|min:1',
            'video' => 'required|file|mimes:mp4,mov,avi,wmv|max:102400'
        ]);

        try {
            $content = $request->input('content', '');
            $title = $request->input('title');
            $duration = $request->integer('duration');
            $videoPath = $request->file('video')->store('videos/courses', 'public');

            $courseLesson = $course->courseLessons()->create([
                'content' => $content,
                'title' => $title,
                'duration' => $duration,
                'video_path' => $videoPath
            ]);

            return response()->json([
                'message' => 'Lesson created successfully',
                'data' => $courseLesson
            ]);
        } catch (\Exception) {
            return response()->json(['error' => 'An error occurred while creating the lesson'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function updateLesson(Request $request, Course $course, CourseLesson $courseLesson)
    {
        $request->validate([
            'title' => 'nullable|string|max:255',
            'content' => 'nullable|string',
            'duration' => 'nullable|integer|min:1',
            'video' => 'nullable|file|mimes:mp4,mov,avi,wmv|max:102400'
        ]);

        try {
            DB::beginTransaction();

            $title = $request->input('title', $courseLesson->title);
            $content = $request->input('content', $courseLesson->content);
            $duration = $request->input('duration', $courseLesson->duration);
            $videoFile = $request->file('video');
            $oldVideoPath = $courseLesson->video_path;
            $videoPath = $videoFile ?
                $videoFile->store('videos/courses', 'public') :
                $oldVideoPath;

            $courseLesson->update([
                'title' => $title,
                'content' => $content,
                'duration' => $duration,
                'video_path' => $videoPath
            ]);

            if ($videoFile) {
                Storage::disk('public')->delete($oldVideoPath);
            }

            DB::commit();

            return response()->json([
                'message' => 'Lesson updated successfully',
                'data' => $courseLesson->refresh()
            ]);

        } catch (\Exception) {
            DB::rollBack();
            return response()->json(['error' => 'An error occurred while updating the lesson'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function destroyLesson(Course $course, CourseLesson $courseLesson)
    {
        try {
            DB::beginTransaction();

            $videoPath = $courseLesson->video_path;
            $courseLesson->delete();

            Storage::disk('public')->delete($videoPath);

            DB::commit();

            return response()->json([
                'message' => 'Lesson deleted successfully',
            ]);
        } catch (\Exception) {
            DB::rollBack();
            return response()->json(['error' => 'An error occurred while deleting the lesson'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
