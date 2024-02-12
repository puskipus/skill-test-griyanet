<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class CustomerController extends Controller
{
    public function create(Request $request)
    {
        $validator = Validator::make(request()->all(), [
            'nama' => 'required',
            'noHP' => 'required',
            'alamat' => 'required',
            'paket' => 'required',
            'ktp' => 'required|image|mimes:jpeg,png,jpg',
            'fotoBangunan' => 'required|image|mimes:jpeg,png,jpg',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->messages());
        }

        $ktp = $request->file('ktp');
        $fotoBangunan = $request->file('fotoBangunan');

        $ktpName = time() . '_' . $ktp->getClientOriginalName();
        $fotoBangunanName = time() . '_' . $fotoBangunan->getClientOriginalName();

        $ktp->move(public_path('images'), $ktpName);
        $fotoBangunan->move(public_path('images'), $fotoBangunanName);

        $customer = Customer::create([
            'nama' => request('nama'),
            'noHP' => request('noHP'),
            'alamat' => request('alamat'),
            'paket' => request('paket'),
            'ktp' => $ktpName,
            'fotoBangunan' => $fotoBangunanName,
        ]);

        if ($customer) {
            return response()->json(['message' => 'Create Customer Success'], 200);
        } else {
            return response()->json(['message' => 'Create Customer Failed'], 404);
        }
    }

    public function getAll()
    {

        $customer = Customer::select("nama", "noHP", "alamat", "paket", "ktp", "fotoBangunan")->get();

        if ($customer) {
            return response()->json($customer, 200);
        } else {
            return response()->json(['message' => 'Get Customer Failed'], 404);
        }
    }
}
