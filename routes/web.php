<?php

use App\Http\Controllers\User\Dashboard\DashboardController;
use App\Http\Controllers\User\UserGuest\UserGuestController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', [UserGuestController::class, 'home'])->name('home');
Route::get('/add-new-laptop', [UserGuestController::class, 'add_new_laptop'])->name('add.new.laptop');
Route::get('/save-laptop', [UserGuestController::class, 'save_laptop']);

Route::name('user.')->prefix('user')->group(function () {
    Route::middleware('auth','verified')->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'dashboard'])->name('dashboard');
    });
});

require __DIR__.'/auth.php';
require __DIR__.'/admin_auth.php';
