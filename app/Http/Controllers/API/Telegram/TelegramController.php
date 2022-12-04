<?php

namespace App\Http\Controllers\API\Telegram;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Http;

class TelegramController extends Controller
{
    public function getSelf(){
        return Http::get(env('TELEGRAM_API_URL') . '/session/getSelf', []);
    }
}
