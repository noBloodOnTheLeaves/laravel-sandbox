<?php

namespace App\Http\Controllers\API\SOAP;

use SoapServer;

class SoapServerNativePhp
{
    public function initSoap()
    {
        $server = new SoapServer(null, ["uri" => "http://localhost/soapsrv/handle"]);
        $soap = $server->setClass(Users::class);
        $soap->handle();
    }
}

