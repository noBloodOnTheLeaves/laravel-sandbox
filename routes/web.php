<?php

use App\Http\Controllers\ProfileController;
use App\Http\Livewire\ClientContractInfo;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->middleware(['auth', 'verified']);

Route::get('/', function () {
    return Inertia::render('Dashboard',['roles' => \Illuminate\Support\Facades\Auth::user()->getRoleNames()]);
})->middleware(['auth', 'verified'])->name('dashboard');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/client-contract',ClientContractInfo::class);

    Route::get('/get-contract-emails', function () {
        return Inertia::render('ContractEmail');
    });

    Route::get('/users', function () {
        return Inertia::render('ContractEmail');
    });
});

require __DIR__.'/auth.php';
