<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::group(['middleware' => 'api', 'prefix' => 'auth'], function ($router) {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register'])->middleware('admin');
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::post('me', [AuthController::class, 'me']);
});

Route::group(['middleware' => ['api', 'admin'], 'prefix' => 'product'], function ($router) {
    Route::post('create', [ProductController::class, 'create']);
});

Route::group(['middleware' => ['api'], 'prefix' => 'product'], function ($router) {
    Route::get('/', [ProductController::class, 'get']);
});

Route::group(['middleware' => ['api', 'sales'], 'prefix' => 'customer'], function ($router) {
    Route::post('/', [CustomerController::class, 'create']);
    Route::get('/', [CustomerController::class, 'getByUserID']);
    Route::get('/{id}', [CustomerController::class, 'getByID']);
    Route::delete('/{id}', [CustomerController::class, 'destroy']);
    Route::post('/update/{id}', [CustomerController::class, 'update']);
});

Route::group(['middleware' => ['api', 'admin'], 'prefix' => 'customer'], function ($router) {
    Route::get('/all', [CustomerController::class, 'getAll']);
    Route::get('/all/convert', [CustomerController::class, 'getAllConvert']);
});
