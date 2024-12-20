<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RegisterController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $request->validate([
            'email' => 'required|email|unique:users',
            'first_name' => 'required|string|alpha|max:50',
            'last_name' => 'required|string|alpha|max:50',
            'password' => 'required|min:8|confirmed',
            'birthdate' => 'required|date',
        ]);

        try {
            User::create([
                'email' => $request->email,
                'password' => $request->password,
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'birthdate' => $request->birthdate,
            ]);

            return response()->json(['message' => 'User registered successfully'], Response::HTTP_CREATED);
        } catch (\Exception) {
            return response()->json(['message' => 'Failed to register user'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
