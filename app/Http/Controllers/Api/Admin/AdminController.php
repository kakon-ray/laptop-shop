<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminController extends Controller
{
    function admindetails(Request $request)
    {

      $admin = Auth::guard('admin-api')->user();
      return response()->json(['Admin'=>$admin, 'status' => 200, 'msg' => 'Admin Data']);
     
    }
}
