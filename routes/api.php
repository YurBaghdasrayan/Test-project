<?php

use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::post('registration', [UserController::class,'store']);
Route::post('login', [UserController::class,'login']);
Route::post('verify', [UserController::class, 'emailVerify']);
Route::group(['middleware' => 'auth:api'], function () {
    Route::get('user_data', [UserController::class,'authuser']);
    Route::patch('users/{user}', [\App\Http\Controllers\UserController::class, 'update']);
    Route::get('users/auth', [UserController::class,'authuser']);

});

Route::group(['middleware' => 'AdminAuth'], function ($router) {

    Route::get('users', [\App\Http\Controllers\UserController::class, 'test']);
//    Route::post('login', 'AuthController@login');
//    Route::post('logout', 'AuthController@logout');
//    Route::post('refresh', 'AuthController@refresh');
//    Route::post('me', 'AuthController@me');

});

