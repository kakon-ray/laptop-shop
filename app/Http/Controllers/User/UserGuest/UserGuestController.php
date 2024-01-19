<?php

namespace App\Http\Controllers\User\UserGuest;

use App\Http\Controllers\Controller;
use App\Models\Laptop;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

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

        $arrayRequest = [
            'name' => $request->name,
            'image' => $request->image,
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

            return response()->json([
                'status' => 400,
                'msg' => $msg
            ], 200);
        } else {
            DB::beginTransaction();

            try {

                // $img = $request->image;
                // $image =  $img->store('/public/image');
                // $image = (explode('/', $image))[2];
                // $host = $_SERVER['HTTP_HOST'];
                // $image = "http://" . $host . "/storage/image/" . $image;

                $laptop = Laptop::create([
                    'name' => $request->name,
                    'image' => 'oer',
                    'price' => $request->price,
                ]);

                DB::commit();
            } catch (\Exception $err) {
                $laptop = null;
            }

            if ($laptop != null) {
                return response()->json([
                    'status' => 200,
                    'msg' => 'Add New Book'
                ]);
            } else {
                return response()->json([
                    'status' => 500,
                    'msg' => 'Server Error',
                    'err_msg' => $err->getMessage()
                ]);
            }
        }
    }
}
