<?php

namespace App\Http\Controllers\User\UserGuest;

use App\Http\Controllers\Controller;
use App\Models\Laptop;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Session;


class UserGuestController extends Controller
{
    public function home()
    {
        $allLaptop = Laptop::get();
        return Inertia::render('Home', ['allLaptop'=>$allLaptop]);
    }
    public function add_new_laptop()
    {
        return Inertia::render('AddNewLaptop', ['title'=>'Kakon Ray']);
    }
    public function save_laptop(Request $request)
    {
    //    dd($request->all());
        $arrayRequest = [
            'name' => $request->name,
            'image' => $request->avatar,
            'price' => $request->price,
        ];

        $arrayValidate  = [
            'name' => 'required',
            'image' => 'required',
            'price' => 'required',
        ];

        $response = Validator::make($arrayRequest, $arrayValidate);

        if ($response->fails()) {
            $msg = '';
            foreach ($response->getMessageBag()->toArray() as $item) {
                $msg = $item;
            };

            Session::flash('error', $msg);
                return Redirect::back();
        } else {
            DB::beginTransaction();

            try {

                $img = $request->avatar;
                $image =  $img->store('/public/image');
                $image = (explode('/', $image))[2];
                $host = $_SERVER['HTTP_HOST'];
                $image = "http://" . $host . "/storage/image/" . $image;

                $laptop = Laptop::create([
                    'name' => $request->name,
                    'image' => $image,
                    'price' => $request->price,
                ]);

                DB::commit();
            } catch (\Exception $err) {
                $laptop = null;
            }

            if ($laptop != null) {
                Session::flash('success', 'Submeted Book');
                return Redirect::back();
            } else {
                Session::flash('error', 'Internal Server Error');
                return Redirect::back();
            }
        }
    }
}
