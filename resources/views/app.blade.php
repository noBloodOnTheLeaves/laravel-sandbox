<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="antialiased bg-gray-100 filament js-focus-visible dark">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="stylesheet" href="https://fonts.bunny.net/css2?family=Nunito:wght@400;600;700&display=swap">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite([
        'resources/js/app.jsx',
        "resources/js/Pages/{$page['component']}.jsx",
        ])
        @inertiaHead
    </head>
    <body class="filament-body bg-gray-100 text-gray-900 dark:text-gray-100 dark:bg-gray-900" >
        @inertia
        <div id="modal-root"></div>
        <div id="root"></div>
    </body>
</html>
