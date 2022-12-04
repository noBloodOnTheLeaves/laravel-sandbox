<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function getUsers(Request $request)
    {
        $order_by     = $this->listGetOrderBy(['id', 'name', 'email'], 'id');
        $direction    = $this->listGetDirection();
        $search_lower = $this->listGetSearchString();

        $users = User::query()
            ->orderBy($order_by, $direction);

        if (!empty($search_lower)) {
            $users->where(function ($query) use ($search_lower) {
                $query->whereRaw('LOWER(id) LIKE ? ', '%' . $search_lower . '%')
                    ->orWhereRaw('LOWER(name) LIKE ? ', '%' . $search_lower . '%')
                    ->orWhereRaw('LOWER(email) LIKE ? ', '%' . $search_lower . '%');
            });
        }

        return $this->prepareListResponse($users);
    }
}
