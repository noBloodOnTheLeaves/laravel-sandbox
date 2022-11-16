<?php

namespace App\Http\Controllers\API\REST;


class WorkWithRestApiNative
{

    protected function callApi($method, $url, $data = false)
    {
        $curl = curl_init();

        switch ($method)
        {
            case "POST":
                curl_setopt($curl, CURLOPT_POST, 1);

                if ($data)
                    curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
                break;
            case "PUT":
                curl_setopt($curl, CURLOPT_PUT, 1);
                break;
            default:
                if ($data)
                    $url = sprintf("%s?%s", $url, http_build_query($data));
        }

        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

        $result = curl_exec($curl);

        curl_close($curl);

        return $result;
    }

    /**
     * Get users from free rest api.
     *
     * @OA\Get(
     *     path="/freerest/getUsersFromApi",
     *     operationId="getUsersFromApi",
     *     tags={"FreeRestApi"},
     *     summary="Get users from free rest api",
     *     security={
     *       {"api_key": {}},
     *     },
     *     @OA\Response(
     *         response="200",
     *         description="Everything is fine",
     *        @OA\JsonContent(example="[{
                                            'id': 4694,
                                            'name': 'Bilva Devar',
                                            'email': 'devar_bilva@king.org',
                                            'gender': 'male',
                                            'status': 'inactive'
                                        }]")
     *     ),
     * )
     *
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getUsersFromApi()
    {
        return $this->callApi('GET','https://gorest.co.in/public/v2/users');
    }
}
