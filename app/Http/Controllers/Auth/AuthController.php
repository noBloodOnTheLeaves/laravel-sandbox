<?php

namespace App\Http\Controllers\Auth;


use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function getPermissions(){
        $withFacade = Auth::user();
// or with the auth() helper:
        $withHelper = auth()->user();
        return response()->json([
            '$withFacade' => $withFacade,
            '$withHelper' => $withHelper,
        ]);
    }
}
