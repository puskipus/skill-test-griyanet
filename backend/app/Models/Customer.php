<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama',
        'noHP',
        'alamat',
        'paket',
        'ktp',
        'fotoBangunan',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class, 'paket', 'namaPaket');
    }
}
