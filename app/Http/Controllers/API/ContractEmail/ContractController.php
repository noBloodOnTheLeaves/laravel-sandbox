<?php

namespace App\Http\Controllers\API\ContractEmail;

use App\Models\Contract;
use Illuminate\Http\Request;

class ContractController
{
    public function getEmailsByContractNumber (Request $request): string
    {
        $contract = Contract::query()->select('bz_clients.email')
            ->join('bz_clients', function($join)
            {
                $join->on('bz_docs.client_id', '=', 'bz_clients.id')
                    ->where('bz_clients.email','not like', '');
            });
        if($request->get('number')){
            $contract->where('bz_docs.number','like', $request->get('number') . '%');
        }

       return $contract->groupBy('bz_clients.email')->get()->toJson();
    }
}
