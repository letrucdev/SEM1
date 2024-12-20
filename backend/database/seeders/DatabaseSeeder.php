<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use Illuminate\Database\Seeder;
use App\Enums\UserRole;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        //Create the admin user
        User::create([
            'email' => config('app.admin_account.email'),
            'password' => config('app.admin_account.password'),
            'first_name' => 'Admin',
            'last_name' => '',
            'birthdate' => now(),
            'role' => UserRole::Admin
        ]);

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
