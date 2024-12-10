<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;
use App\Notifications\ResetPasswordNotification;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        //
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        /* ResetPassword::createUrlUsing(function (object $notifiable, string $token) {
             return config('app.frontend_url') . "/password-reset/$token?email={$notifiable->getEmailForPasswordReset()}";
         });*/

        /* ResetPassword::toMailUsing(function ($notifiable, $token) {
             return (new ResetPasswordNotification($token))
                 ->toMail($notifiable);
         });*/

        ResetPasswordNotification::createUrlUsing(function (object $notifiable, string $token) {
            return config('app.frontend_url') . "/password-reset/$token?email={$notifiable->email}";
        });
    }
}
