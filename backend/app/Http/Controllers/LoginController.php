<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class LoginController extends Controller
{
    function __invoke(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        //Revoke old tokens before creating a new one
        $user->tokens()->delete();

        return [
            'message' => 'Login successful!',
            'data' => $user,
            'access_token' => $user->createToken('user_token', ['*'], now()->addHour(3))->plainTextToken,
        ];
    }
}
