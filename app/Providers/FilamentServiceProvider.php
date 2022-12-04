<?php

namespace App\Providers;

use App\Filament\Resources\UserResource;
use Filament\Facades\Filament;
use Filament\Navigation\UserMenuItem;
use Illuminate\Support\ServiceProvider;

class FilamentServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        if(auth()->user()){
            Filament::serving(function() {
                if (auth()->user()->is_admin === 1 && auth()->user()->hasAnyRole(['admin'])) {
                    Filament::registerUserMenuItems([
                        UserMenuItem::make()
                            ->label('Пользователи')
                            ->icon('heroicon-o-users')
                            ->url(UserResource::getUrl())
                    ]);
                }
            });
        }
    }
}
