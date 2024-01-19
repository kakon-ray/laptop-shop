<?php

use App\Http\Controllers\Api\User\UserAuthController;
use App\Http\Controllers\Api\User\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::post('user/login', [UserAuthController::class, 'userlogin']);
Route::post('user/registration', [UserAuthController::class, 'registration']);

Route::group( ['prefix' => 'user','middleware' => ['auth:user-api','scopes:user'] ],function(){
    // authenticated staff routes here 
    Route::get('details', [UserController::class, 'userdetails']);
 });
