<?php

use App\Http\Controllers\API\REST\WorkWithRestApiNative;
use App\Http\Controllers\API\SOAP\SoapClientNativePhpCalculator;
use App\Http\Controllers\API\SOAP\SoapServerNativePhp;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['prefix' => '/soapsrv'], function () {
    Route::get('handle',[SoapServerNativePhp::class, 'initSoap']);
    Route::get('SoapServerNativePhp',function (){ return SoapServerNativePhp::class;});
});

Route::group(['prefix' => '/soapclient'], function (){
   Route::get('getMethods',[SoapClientNativePhpCalculator::class, 'getSoapMethods']);
   Route::get('getCookies',[SoapClientNativePhpCalculator::class, 'getCookies']);
   Route::get('getTypes',[SoapClientNativePhpCalculator::class, 'getTypes']);
   Route::get('multiply',[SoapClientNativePhpCalculator::class, 'multiply']);
   Route::get('divide',[SoapClientNativePhpCalculator::class, 'divide']);
   Route::get('sum',[SoapClientNativePhpCalculator::class, 'sum']);
   Route::get('subtract',[SoapClientNativePhpCalculator::class, 'subtract']);
});

Route::group(['prefix' => '/freerest'], function (){
    Route::get('getUsersFromApi',[WorkWithRestApiNative::class, 'getUsersFromApi']);
});




