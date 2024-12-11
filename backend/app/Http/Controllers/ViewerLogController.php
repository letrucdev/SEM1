<?php

namespace App\Http\Controllers;

use App\Models\ViewerLog;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ViewerLogController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'path' => ['required', 'string', 'max:255'],
        ]);

        try {
            $viewerLogCount = ViewerLog::whereDay('created_at', now())
                ->where('user_agent', $request->userAgent())
                ->where('ip_address', $request->ip())
                ->count();

            if (!$viewerLogCount) {
                ViewerLog::create([
                    'user_agent' => $request->userAgent(),
                    'ip_address' => $request->ip(),
                ]);
            }

            return response()->json(['message' => 'Viewer log stored successfully'], Response::HTTP_CREATED);
        } catch (\Exception) {
            return response()->json(['error' => 'Failed to store viewer log'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function count()
    {
        try {
            $viewerLogCount = ViewerLog::distinct()->count('ip_address');
            return response()->json(['message' => 'Viewer log count', 'data' => $viewerLogCount]);
        } catch (\Exception $e) {

            return response()->json(['error' => 'Failed to count viewer logs'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
