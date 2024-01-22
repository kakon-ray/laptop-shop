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
        return Inertia::render('Home', ['allLaptop' => $allLaptop]);
    }
    public function cart()
    {
        $allLaptop = Laptop::get();
        return Inertia::render('Cart');
    }
    public function add_new_laptop()
    {
        return Inertia::render('AddNewLaptop', ['title' => 'Kakon Ray']);
    }
    public function save_laptop(Request $request)
    {
        //    dd($request->all());
        $arrayRequest = [
            'name' => $request->name,
            'image' => $request->avatar,
            'price' => $request->price,
            'quentity' => $request->quentity,
        ];

        $arrayValidate  = [
            'name' => 'required',
            'image' => 'required',
            'price' => 'required',
            'quentity' => 'required',
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
                    'quentity' => $request->quentity,
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
    public function delete_laptop(Request $request)
    {
        $laptop = Laptop::find($request->id);

        if (is_null($laptop)) {

            return response()->json([
                'msg' => "Do not find any Item",
                'status' => 404
            ], 404);
        } else {

            DB::beginTransaction();

            try {

                $laptop->delete();
                DB::commit();

                return response()->json([
                    'status' => 200,
                    'msg' => 'Delete this Laptop',
                ], 200);
            } catch (\Exception $err) {

                DB::rollBack();

                return response()->json([
                    'msg' => "Internal Server Error",
                    'status' => 500,
                    'err_msg' => $err->getMessage()
                ], 500);
            }
        }
    }

    public function update_laptop(Request $request)
    {

        $laptop = Laptop::find($request->id);
        return Inertia::render('UpdateLaptop', ['laptop' => $laptop]);
    }

    public function update_laptop_submited(Request $request)
    {
        // dd($request->all());

        $laptop = Laptop::find($request->id);

        if (is_null($laptop)) {
            return response()->json([
                'msg' => "Can Not Find any Laptop",
                'status' => 404
            ], 404);
        } else {

            if($request->avatar){
                $arrayRequest = [
                    'name' => $request->name,
                    'image' => $request->avatar,
                    'price' => $request->price,
                    'quentity' => $request->quentity,
                ];
    
                $arrayValidate  = [
                    'name' => 'required',
                    'image' => 'required',
                    'price' => 'required',
                    'quentity' => 'required',
                ];
            }else{
                $arrayRequest = [
                    'name' => $request->name,
                    'price' => $request->price,
                    'quentity' => $request->quentity,
                ];
    
                $arrayValidate  = [
                    'name' => 'required',
                    'price' => 'required',
                    'quentity' => 'required',
                ];
            }

            $response = Validator::make($arrayRequest, $arrayValidate);

            if ($response->fails()) {
                $msg = '';
                foreach ($response->getMessageBag()->toArray() as $item) {
                    $msg = $item;
                };

                Session::flash('error', $msg);
                return Redirect::to('/');
            } else {
                DB::beginTransaction();

                try {

                    if ($request->avatar) {
                        $img = $request->avatar;
                        $image =  $img->store('/public/image');
                        $image = (explode('/', $image))[2];
                        $host = $_SERVER['HTTP_HOST'];
                        $image = "http://" . $host . "/storage/image/" . $image;
                    } else {
                        $image = $request->image;
                    }


                    $laptop->name = $request->name;
                    $laptop->image = $image;
                    $laptop->price = $request->price;
                    $laptop->quentity = $request->quentity;

                    $laptop->save();
                    DB::commit();
                } catch (\Exception $err) {
                    DB::rollBack();
                    $laptop = null;
                }

                if (is_null($laptop)) {
                    Session::flash('error', 'Internal Server Error');
                    return Redirect::to('/');
                } else {
                    Session::flash('success', 'Updated Successfully');
                    return Redirect::to('/');
                }
            }
        }
    }
}
