<?php

use App\Http\Controllers\API\REST\GoRestPostsController;
use App\Http\Controllers\API\REST\WorkWithRestApiNative;
use App\Http\Controllers\API\SOAP\SoapClientNativePhpCalculator;
use App\Http\Controllers\API\SOAP\SoapServerNativePhp;
use App\Http\Controllers\API\Telegram\TelegramController;
use App\Http\Controllers\Auth\AuthController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => 'auth:sanctum'], function() {
    Route::get('/users', [UserController::class, 'getUsers']);
    Route::get('/posts', [GoRestPostsController::class, 'getAllPosts']);
});

Route::middleware('auth')->group(function () {
    Route::get('/getPermissons', [AuthController::class, 'getPermissions']);
});




/*
 * Play with soap
 */

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

/*
 * Play with rest
 */
Route::group(['prefix' => '/freerest'], function (){
    Route::get('getUsersFromApi',[WorkWithRestApiNative::class, 'getUsersFromApi']);
});

//Route::get('/getEmailsByContractNumber',[ContractController::class, 'getEmailsByContractNumber']);

/*
 * for future telegram api usage
 */
Route::group(['prefix' => '/telegram'], function (){
    Route::get('getItself',[TelegramController::class, 'getSelf']);
});



