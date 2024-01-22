<?php

use App\Http\Controllers\User\Dashboard\DashboardController;
use App\Http\Controllers\User\UserGuest\UserGuestController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', [UserGuestController::class, 'home'])->name('home');
Route::get('/cart', [UserGuestController::class, 'cart'])->name('cart');
Route::get('/add-new-laptop', [UserGuestController::class, 'add_new_laptop'])->name('add.new.laptop');
Route::post('/save-laptop', [UserGuestController::class, 'save_laptop']);
Route::get('/delete-laptop/{id}', [UserGuestController::class, 'delete_laptop']);
Route::get('/update-laptop/{id}', [UserGuestController::class, 'update_laptop']);
Route::post('/update-laptop-submited', [UserGuestController::class, 'update_laptop_submited']);

Route::name('user.')->prefix('user')->group(function () {
    Route::middleware('auth','verified')->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'dashboard'])->name('dashboard');
    });
});

require __DIR__.'/auth.php';
require __DIR__.'/admin_auth.php';
