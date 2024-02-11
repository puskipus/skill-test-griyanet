<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    public function create()
    {
        $validator = Validator::make(request()->all(), [
            'namaPaket' => 'required|unique:products',
            'kecepatanInternet' => 'required',
            'fitur' => 'required',
            'harga' => 'required',

        ]);

        if ($validator->fails()) {
            return response()->json($validator->messages());
        }

        $product = Product::create([
            'namaPaket' => request('namaPaket'),
            'kecepatanInternet' =>  request('kecepatanInternet'),
            'fitur' =>  request('fitur'),
            'harga' =>  request('harga'),

        ]);

        if ($product) {
            return response()->json(['message' => 'Create Product Success'], 200);
        } else {
            return response()->json(['message' => 'Create Product Failed'], 404);
        }
    }
}
