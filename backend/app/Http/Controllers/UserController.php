<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Symfony\Component\HttpFoundation\Response;

class UserController extends Controller
{
    public function getMe()
    {
        try {
            return response()->json(['message' => 'User retrieved successfully', 'data' => Auth::user()]);
        } catch (\Exception) {
            return response()->json(['message' => 'An error occurred while fetching user data'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function updateMe(Request $request)
    {
        $user = Auth::user();
        $request->validate([
            'email' => ['nullable', 'email', Rule::unique('users', 'email')->ignore($user)],
            'first_name' => 'nullable|string|max:50',
            'last_name' => 'nullable|string|max:50',
            'birthdate' => 'nullable|date:Y-m-d',
            'avatar' => 'nullable|file|image|max:2048'
        ]);

        try {

            $email = $request->input('email', $user->email);
            $firstName = $request->input('first_name', $user->first_name);
            $lastName = $request->input('last_name', $user->last_name);
            $avatarFile = $request->file('avatar');
            $birthdate = $request->input('birthdate', $user->birthdate);

            $oldAvatarPath = $user->avatar_path;
            $avatarPath = $avatarFile ? $avatarFile->store('avatars/users', 'public') : $oldAvatarPath;

            $user->update([
                'email' => $email,
                'first_name' => $firstName,
                'last_name' => $lastName,
                'avatar_path' => $avatarPath,
                'birthdate' => $birthdate,
            ]);

            if ($avatarFile) {
                Storage::disk('public')->delete($oldAvatarPath);
            }

            return response()->json(['message' => 'User updated successfully', 'data' => $user]);

        } catch (\Exception) {
            return response()->json(['message' => 'An error occurred while updating user data'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function updatePassword(Request $request)
    {
        $request->validate([
            'password' => 'required|string',
            'new_password' => 'required|string|min:8|confirmed'
        ]);

        try {
            $user = Auth::user();
            if (!Hash::check($request->password, $user->password)) {
                return response()->json(['errors' => ['password' => ['Current password is incorrect']]], Response::HTTP_UNAUTHORIZED);
            }

            $user->update(['password' => Hash::make($request->new_password)]);

            return response()->json(['message' => 'Password updated successfully']);
        } catch (\Exception) {
            return response()->json(['message' => 'An error occurred while updating password'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function getUser(Request $request)
    {
        $request->validate([
            'page' => 'nullable|integer|min:0',
            'pageSize' => 'nullable|integer|min:1',
            'search' => 'nullable|string|max:255'
        ]);
        
        $page = $request->query('page', 0);
        $pageSize = $request->query('pageSize', 10);
        $search = $request->query('search');

        try {
            $users = User::offset($page * $pageSize)->limit($pageSize)
                ->where('role', \App\Enums\UserRole::User)
                ->when($search, function ($query, $search) {
                    $query
                        ->where('first_name', 'like', '%' . $search . '%')
                        ->orWhere('last_name', 'like', '%' . $search . '%')
                        ->orWhere('email', 'like', '%' . $search . '%');
                })
                ->get();

            return response()->json(['message' => 'Users retrieved successfully', 'data' => $users]);
        } catch (\Exception) {
            return response()->json(['message' => 'An error occurred while fetching user data'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function showUser(User $user)
    {
        try {
            return response()->json(['message' => 'User retrieved successfully', 'data' => $user]);
        } catch (\Exception) {
            return response()->json(['message' => 'An error occurred while fetching user data'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function updateUser(Request $request, User $user)
    {
        $request->validate([
            'email' => ['nullable', 'email', Rule::unique('users', 'email')->ignore($user)],
            'first_name' => 'nullable|string|max:50',
            'last_name' => 'nullable|string|max:50',
            'birthdate' => 'nullable|date:d-m-Y',
            'avatar' => 'nullable|file|image|max:10240',
        ]);

        try {
            $email = $request->input('email', $user->email);
            $firstName = $request->input('first_name', $user->first_name);
            $lastName = $request->input('last_name', $user->first_name);
            $birthdate = $request->input('birthdate', $user->birthdate);
            $education = $request->input('education', $user->education);
            $avatarFile = $request->file('avatar');

            $oldAvatarPath = $user->avatar_path;
            $avatarPath = $avatarFile ? $avatarFile->store('avatars/users', 'public') : $oldAvatarPath;

            DB::beginTransaction();

            $user->update([
                'email' => $email,
                'first_name' => $firstName,
                'last_name' => $lastName,
                'birthdate' => $birthdate,
                'education' => $education,
                'avatar_path' => $avatarPath,
            ]);

            if ($avatarFile) {
                Storage::disk('public')->delete($oldAvatarPath);
            }

            DB::commit();

            return response()->json(['message' => 'User updated successfully', 'data' => $user]);
        } catch (\Exception) {
            DB::rollBack();
            return response()->json(['message' => 'An error occurred while updating user data'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function destroyUser(User $user)
    {
        try {
            DB::beginTransaction();

            $avatarPath = $user->avatar_path;
            $user->delete();
            Storage::disk('public')->delete($avatarPath);

            DB::commit();
            return response()->json(['message' => 'User deleted successfully']);
        } catch (\Exception) {
            DB::rollBack();
            return response()->json(['message' => 'An error occurred while deleting user data'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
