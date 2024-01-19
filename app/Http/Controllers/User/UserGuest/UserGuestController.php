<?php

namespace App\Http\Controllers\User\UserGuest;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserGuestController extends Controller
{
    public function home()
    {
        return Inertia::render('Home', ['title'=>'Kakon Ray']);
    }
    public function add_new_laptop()
    {
        return Inertia::render('AddNewLaptop', ['title'=>'Kakon Ray']);
    }
    public function save_laptop(Request $request)
    {
        dd($request->all());
    }
}
