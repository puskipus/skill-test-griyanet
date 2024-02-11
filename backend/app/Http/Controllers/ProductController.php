<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    // public function register()
    // {
    //     $validator = Validator::make(request()->all(), [
    //         'name' => 'required',
    //         'nip' => 'required|unique:users',
    //         'password' => 'required',

    //     ]);

    //     if ($validator->fails()) {
    //         return response()->json($validator->messages());
    //     }

    //     $user = User::create([
    //         'name' => request('name'),
    //         'nip' => request('nip'),
    //         'password' => Hash::make(request('password')),
    //         'role' => "sales",

    //     ]);

    //     if ($user) {
    //         return response()->json(['message' => 'Register Success'], 200);
    //     } else {
    //         return response()->json(['message' => 'Register Failed'], 404);
    //     }
    // }
}
