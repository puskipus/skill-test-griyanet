<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'namaPaket',
        'kecepatanInternet',
        'fitur',
        'harga',
    ];

    public function customers()
    {
        return $this->hasMany(Customer::class, 'namaPaket', 'paket');
    }
}
