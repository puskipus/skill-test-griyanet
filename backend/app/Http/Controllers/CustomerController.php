<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Dompdf\Dompdf;
use Dompdf\Options;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
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
            'salesID' => auth()->id(),
        ]);


        if ($customer) {
            return response()->json(['message' => 'Create Customer Success'], 200);
        } else {
            return response()->json(['message' => 'Create Customer Failed'], 404);
        }
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make(request()->all(), [
            'nama' => 'required',
            'noHP' => 'required',
            'alamat' => 'required',
            'paket' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->messages());
        }

        $customer = Customer::findOrFail($id);

        $customer->nama = $request->nama;
        $customer->noHP = $request->noHP;
        $customer->alamat = $request->alamat;
        $customer->paket = $request->paket;

        // Check if there's a file uploaded for 'ktp'
        if ($request->hasFile('ktp')) {
            $ktp = $request->file('ktp');
            $ktpName = time() . '_' . $ktp->getClientOriginalName();
            $ktp->move(public_path('images'), $ktpName);

            Storage::delete(public_path('images').basename($customer->ktp));

            $customer->ktp = $ktpName;
        }

        // Check if there's a file uploaded for 'fotoBangunan'
        if ($request->hasFile('fotoBangunan')) {
            $fotoBangunan = $request->file('fotoBangunan');
            $fotoBangunanName = time() . '_' . $fotoBangunan->getClientOriginalName();
            $fotoBangunan->move(public_path('images'), $fotoBangunanName);

            Storage::delete(public_path('images').basename($customer->fotoBangunan));

            $customer->fotoBangunan = $fotoBangunanName;
        }

        $customer->update();

        return response()->json(['message' => 'Customer updated successfully']);
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

    public function getByUserID()
    {

        $customer = Customer::where('salesID', auth()->id())->select("id", "nama", "noHP", "alamat", "paket", "ktp", "fotoBangunan")->get();

        if ($customer) {
            return response()->json($customer, 200);
        } else {
            return response()->json(['message' => 'Get Customer Failed'], 404);
        }
    }

    public function getByID($id)
    {

        $customer = Customer::where('salesID', auth()->id())->where('id', $id)->select("id", "nama", "noHP", "alamat", "paket", "ktp", "fotoBangunan")->get();

        if ($customer) {
            return response()->json($customer, 200);
        } else {
            return response()->json(['message' => 'Get Customer Failed'], 404);
        }
    }

    public function getAllConvert()
    {

        $customers = Customer::with(['product' => function ($query) {
            $query->select('namaPaket', 'harga');
        }])->select("nama", "noHP", "alamat", 'paket')->get();

        $dataArray = [];
        foreach ($customers as $customer) {
            $dataArray[] = [
                'Nama' => $customer->nama,
                'No. HP' => $customer->noHP,
                'Alamat' => $customer->alamat,
                'Paket' => $customer->paket,
                'Nama Paket' => $customer->product->namaPaket,
                'Harga' => $customer->product->harga,
            ];
        }

        $options = new Options();
        $options->set('isHtml5ParserEnabled', true);
        $options->set('isPhpEnabled', true);

        $pdf = new Dompdf($options);
        $pdf->loadHtml(view('pdf.customer', ['customers' => $dataArray])->render());
        $pdf->setPaper('A4', 'landscape');
        $pdf->render();

        $pdfContent = $pdf->output();
        return Response::make($pdfContent, 200, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'attachment; filename="customers.pdf"',
        ]);
    }

    public function destroy($id)
    {
        $customer = Customer::find($id);
        if (!$customer || $customer->id  != auth()->id()) {
            return response()->json(['message' => 'customer not found'], 404);
        }

        $customer->delete();

        return response()->json(['message' => 'customer deleted successfully']);
    }

}
