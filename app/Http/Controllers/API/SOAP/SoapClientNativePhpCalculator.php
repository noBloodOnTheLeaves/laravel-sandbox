<?php
/**
 * @license Apache 2.0
 */

namespace App\Http\Controllers\API\SOAP;

use Exception;
use Illuminate\Http\Request;
use SoapClient;
use SoapFault;
use OpenApi\Annotations as OA;

/**
 * Class SoapClientNativePhpCalculator.
 *
 */
class SoapClientNativePhpCalculator
{
    public function initSoap()
    {
        try {
            return  new SoapClient('http://www.dneonline.com/calculator.asmx?wsdl',
                [
                    'trace' => true,
                    'exceptions' => true,
                    'cache_wsdl' => WSDL_CACHE_NONE,
                    'connection_timeout' => 30,
                ]);
        } catch (SoapFault $e) {
            throw new Exception($e->getMessage());
        }
    }
    /**
     * Get methods of soap calculator.
     *
     * @OA\Get(
     *     path="/soapclient/getMethods",
     *     operationId="getCalculatorMethods",
     *     tags={"SoapCalculator"},
     *     summary="Get methods of Calculator SOAP API ",
     *     security={
     *       {"api_key": {}},
     *     },
     *     @OA\Response(
     *         response="200",
     *         description="Everything is fine",
     *         @OA\MediaType(
     *             mediaType="application/json",
     *         )
     *     ),
     * )
     *
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getSoapMethods()
    {
        return $this->initSoap()->__getFunctions();
    }
    /**
     * Get types of soap calculator.
     *
     * @OA\Get(
     *     path="/soapclient/getTypes",
     *     operationId="getCalculatorTypes",
     *     tags={"SoapCalculator"},
     *     summary="Get types of Calculator SOAP API ",
     *     security={
     *       {"api_key": {}},
     *     },
     *     @OA\Response(
     *         response="200",
     *         description="Everything is fine",
     *         @OA\MediaType(
     *             mediaType="application/json",
     *         )
     *     ),
     * )
     *
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getTypes()
    {
        return $this->initSoap()->__getTypes();
    }

    public function getCookies()
    {
        return $this->initSoap()->__getCookies();
    }

    protected function soapCall( string $name, array $args, ?array $options = null, SoapHeader|array|null $inputHeaders = null, array &$outputHeaders = null)
    {
        return $this->initSoap()->__soapCall($name, $args, $options, $inputHeaders, $outputHeaders);
    }
    /**
     * Get multiply numbers result of soap calculator.
     *
     * @OA\Get(
     *     path="/soapclient/multiply",
     *     operationId="callMultiplyMethod",
     *     tags={"SoapCalculator"},
     *     summary="Use multiply method of SOAP API ",
     *     security={
     *       {"api_key": {}},
     *     },
     *     @OA\Parameter(
     *         name="intA",
     *         in="query",
     *         description="Множитель А",
     *         required=true,
     *         example="2",
     *         @OA\Schema(
     *             type="integer",
     *         ),
     *     ),
     *     @OA\Parameter(
     *         name="intB",
     *         in="query",
     *         description="Множитель B",
     *         required=true,
     *         example="2",
     *         @OA\Schema(
     *             type="integer",
     *         ),
     *     ),
     *     @OA\Response(
     *         response="200",
     *         description="Everything is fine",
     *        @OA\JsonContent(example="{'MultiplyResult': 4}")
     *     ),
     * )
     *
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function multiply(Request $request)
    {
        $parameters = array_map(fn($value) => (int)$value, $request->all());
        return $this->initSoap()->Multiply($parameters);
    }
    /**
     * Get division result of soap calculator.
     *
     * @OA\Get(
     *     path="/soapclient/divide",
     *     operationId="callDivideMethod",
     *     tags={"SoapCalculator"},
     *     summary="Use divide method of SOAP API ",
     *     security={
     *       {"api_key": {}},
     *     },
     *     @OA\Parameter(
     *         name="intA",
     *         in="query",
     *         description="Делимое А",
     *         required=true,
     *         example="2",
     *         @OA\Schema(
     *             type="integer",
     *         ),
     *     ),
     *     @OA\Parameter(
     *         name="intB",
     *         in="query",
     *         description="Делитель B",
     *         required=true,
     *         example="2",
     *         @OA\Schema(
     *             type="integer",
     *         ),
     *     ),
     *     @OA\Response(
     *         response="200",
     *         description="Everything is fine",
     *        @OA\JsonContent(example="{'DivideResult': 1}")
     *     ),
     * )
     *
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function Divide(Request $request)
    {
        $parameters = array_map(fn($value) => (int)$value, $request->all());
        return $this->initSoap()->Divide($parameters);
    }
    /**
     * Get sum result of soap calculator.
     *
     * @OA\Get(
     *     path="/soapclient/sum",
     *     operationId="callSumMethod",
     *     tags={"SoapCalculator"},
     *     summary="Use Sum method of SOAP API ",
     *     security={
     *       {"api_key": {}},
     *     },
     *     @OA\Parameter(
     *         name="intA",
     *         in="query",
     *         description="Слагаемое А",
     *         required=true,
     *         example="2",
     *         @OA\Schema(
     *             type="integer",
     *         ),
     *     ),
     *     @OA\Parameter(
     *         name="intB",
     *         in="query",
     *         description="Слагаемое B",
     *         required=true,
     *         example="2",
     *         @OA\Schema(
     *             type="integer",
     *         ),
     *     ),
     *     @OA\Response(
     *         response="200",
     *         description="Everything is fine",
     *        @OA\JsonContent(example="{'AddResult': 4}")
     *     ),
     * )
     *
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function sum(Request $request)
    {
        $parameters = array_map(fn($value) => (int)$value, $request->all());
        return $this->initSoap()->Add($parameters);
    }
    /**
     * Get subtract result of soap calculator.
     *
     * @OA\Get(
     *     path="/soapclient/subtract",
     *     operationId="callSubstractMethod",
     *     tags={"SoapCalculator"},
     *     summary="Use Subtract method of SOAP API ",
     *     security={
     *       {"api_key": {}},
     *     },
     *     @OA\Parameter(
     *         name="intA",
     *         in="query",
     *         description="Уменьшаемое А",
     *         required=true,
     *         example="2",
     *         @OA\Schema(
     *             type="integer",
     *         ),
     *     ),
     *     @OA\Parameter(
     *         name="intB",
     *         in="query",
     *         description="Вычитаемое B",
     *         required=true,
     *         example="2",
     *         @OA\Schema(
     *             type="integer",
     *         ),
     *     ),
     *     @OA\Response(
     *         response="200",
     *         description="Everything is fine",
     *        @OA\JsonContent(example="{'SubtractResult': 0}")
     *     ),
     * )
     *
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function subtract(Request $request)
    {
        $parameters = array_map(fn($value) => (int)$value, $request->all());
        return $this->initSoap()->Subtract($parameters);
    }
}
