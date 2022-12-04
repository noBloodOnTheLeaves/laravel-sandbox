<?php

namespace App\Http\Controllers\API\REST;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class GoRestPostsController extends Controller
{
    public function getAllPosts(Request $request){
        $url = config('api-urls.gorest.posts');
        $params = [];
        if($request->page) $params['page'] = $request->page;
        if($request->pageSize) $params['per_page'] = $request->pageSize;
        $posts = Http::get($url,$params)->json();
        return $posts;
    }
}
