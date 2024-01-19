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

class UserController extends Controller
{


    function userdetails(Request $request)
    {

      $user = Auth::guard('user-api')->user();
      return response()->json(['user'=>$user, 'status' => 200, 'msg' => 'User Data']);
     
    }
}
