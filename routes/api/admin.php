<?php

use App\Http\Controllers\Api\Admin\AdminAuthController;
use App\Http\Controllers\Api\Admin\AdminController;
use App\Http\Controllers\Api\User\UserAuthController;
use App\Http\Controllers\Api\User\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;




Route::post('admin/registration', [AdminAuthController::class, 'registration']);
Route::post('admin/login', [AdminAuthController::class, 'adminlogin']);

Route::group( ['prefix' => 'admin','middleware' => ['auth:admin-api','scopes:admin'] ],function(){
    // authenticated staff routes here 
    Route::get('details', [AdminController::class, 'admindetails']);
 });