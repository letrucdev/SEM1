<?php

namespace App\Http\Controllers;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Database\Query\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Symfony\Component\HttpFoundation\Response;

class DoctorController extends Controller
{
    public function index(Request $request)
    {
        $request->validate([
            'page' => 'nullable|integer|min:0',
            'pageSize' => 'nullable|integer|min:1|max:100',
            'search' => 'nullable|string|max:255',
            'sortBy' => ['nullable', 'string',
                Rule::in(
                    [
                        'created_at-asc', 'created_at-desc',
                    ])
            ],
        ]);

        $page = $request->query('page', 0);
        $pageSize = $request->query('pageSize', 10);
        $search = $request->query('search');
        $sortBy = $request->query('sortBy');

        try {
            $doctors = User::query()
                ->where('role', UserRole::Doctor)
                ->when($search, function ($query, $search) {
                    $query->where(function ($q) use ($search) {
                        $q
                            ->where('first_name', 'like', '%' . $search . '%')
                            ->orWhere('last_name', 'like', '%' . $search . '%')
                            ->orWhere('email', 'like', '%' . $search . '%');
                    });
                })
                ->when($sortBy, function ($query, $sortBy) {
                    list($column, $direction) = explode('-', $sortBy);
                    $query->orderBy($column, $direction);
                });


            $doctorCount = $doctors->count();

            $doctorsWithIndex = $doctors
                ->offset($page * $pageSize)->limit($pageSize)
                ->get()
                ->map(function ($doctor, $index) use ($page, $pageSize) {
                    $doctor->order = $page * $pageSize + $index + 1;
                    return $doctor;
                });

            return response()->json(['message' => 'Doctors retrieved successfully', 'total' => $doctorCount, 'data' => $doctorsWithIndex]);
        } catch (\Exception) {
            return response()->json(['message' => 'An error occurred while retrieving doctors'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function store(Request $request)
    {
        $request->validate([
            'first_name' => 'required | string | max:255',
            'last_name' => 'required | string | max:255',
            'email' => 'required | string | email | max:255 | unique:users,email',
            'password' => 'required | string | min:8 | confirmed',
            'education' => 'required | string | max:255',
            'birthdate' => 'required | date:d-m-Y',
            'avatar' => 'required | file | image | max:10240'
        ]);

        try {
            $avatarPath = $request->file('avatar')->store('avatars/doctors', 'public');

            $doctor = User::create([
                'last_name' => $request->last_name,
                'first_name' => $request->first_name,
                'email' => $request->email,
                'password' => $request->password,
                'role' => \App\Enums\UserRole::Doctor,
                'education' => $request->education,
                'birthdate' => $request->birthdate,
                'avatar_path' => $avatarPath
            ]);

            return response()->json(['message' => 'Doctor account created successfully', 'data' => $doctor->refresh()]);
        } catch (\Exception) {
            return response()->json(['message' => 'An error occurred while creating a doctor account'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function show(User $user)
    {
        return response()->json([
            'message' => 'Doctor retrieved successfully',
            'data' => $user
        ]);
    }

    public function update(Request $request, User $user)
    {
        $request->validate([
            'first_name' => 'nullable | string | max:255',
            'last_name' => 'nullable | string | max:255',
            'email' => ['nullable', 'string', 'email', Rule::unique('users', 'email')->ignore($user)],
            'birthdate' => 'nullable | date:d-m-Y',
            'education' => 'nullable | string | max:255',
            'avatar' => 'nullable | file | image | max:10240'
        ]);

        try {

            $firstName = $request->input('first_name', $user->first_name);
            $lastName = $request->input('last_name', $user->last_name);
            $email = $request->input('email', $user->email);
            $birthdate = $request->input('birthdate', $user->birthdate);
            $education = $request->input('education', $user->education);
            $avatarFile = $request->file('avatar');

            $oldAvatarPath = $user->avatar_path;
            $avatarPath = $request->file('avatar') ?
                $avatarFile->store('avatars/doctors', 'public') :
                $oldAvatarPath;

            DB::beginTransaction();

            $user->update([
                'first_name' => $firstName,
                'last_name' => $lastName,
                'email' => $email,
                'birthdate' => $birthdate,
                'education' => $education,
                'avatar_path' => $avatarPath,
            ]);

            if ($avatarFile) {
                Storage::disk('public')->delete($oldAvatarPath);
            }

            DB::commit();

            return response()->json(['message' => 'Doctor account updated successfully', 'data' => $user]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'An error occurred while updating the doctor account'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function destroy(User $user)
    {
        try {
            Storage::disk('public')->delete($user->avatar_path);
            $user->delete();

            return response()->json(['message' => 'Doctor account deleted successfully']);
        } catch (\Exception) {
            return response()->json(['message' => 'An error occurred while deleting the doctor account'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
