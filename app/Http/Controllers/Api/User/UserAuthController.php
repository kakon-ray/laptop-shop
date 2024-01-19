<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\Validator;

class UserAuthController extends Controller
{
    function registration(Request $request)
    {
        $arrayRequest = [
            "name" => $request->name,
            "email" => $request->email,
            "password" => $request->password,
            "password_confirmation" => $request->password_confirmation,
        ];

        $arrayValidate  = [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:' . User::class],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ];

        $response = Validator::make($arrayRequest, $arrayValidate);

        if ($response->fails()) {
            $msg = '';
            foreach ($response->getMessageBag()->toArray() as $item) {
                $msg = $item;
            };

            return response()->json(['msg' => $msg], 400);
        } else {
            DB::beginTransaction();
            try {

                $user = User::create([
                    'name' => $request->name,
                    'email' => $request->email,
                    'password' => Hash::make($request->password),

                ]);

                DB::commit();
            } catch (\Exception $err) {
                $user = null;
            }

            if($user != null){
                return response()->json(['msg' => 'Registation Completed'], 200);
            }else{
                return response()->json([
                    'msg' => 'Internal Server Error',
                    'err_msg' => $err->getMessage()
                ], 500);
            }
        }

    }

    function userlogin(Request $request)
    {


        $arrayRequest = [
            "email" => $request->email,
            "password" => $request->password,
        ];

        $arrayValidate  = [
            'email' => 'required',
            'password' => 'required',
        ];

        $response = Validator::make($arrayRequest, $arrayValidate);

        if ($response->fails()) {
            $msg = '';
            foreach ($response->getMessageBag()->toArray() as $item) {
                $msg = $item;
            };

            return response()->json(['msg' => $msg], 400);
        } else {
            if(Auth::guard('user')->attempt(['email' => $request->email, 'password' => $request->password])){

                config(['auth.guards.api.provider' => 'user']);
                
                $token = Auth::guard('user')->user()->createToken('MyApp',['user'])->accessToken;
                
                return response()->json(['token' => $token], 200);
    
            }else{ 
    
                return response()->json(['error' => ['Email and Password are Wrong.']], 200);
            }
        }
    }


}
