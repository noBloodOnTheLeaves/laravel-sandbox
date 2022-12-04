<?php

namespace App\Http\Controllers;

use App\Http\Resources\Common\ListResourceCollection;
use Illuminate\Database\Eloquent\Builder as EloquentBuilder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\ModelNotFoundException as EloquentModelNotFoundException;
use Illuminate\Database\Query\Builder as QueryBuilder;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Pagination\Paginator;
use Illuminate\Routing\Controller as BaseController;

/**
 * @OA\Info(
 *     title="API documentation",
 *     version="1.0.0",
 *     @OA\Contact(
 *         email="igor-skromnik@yande.ru"
 *     ),
 *     @OA\License(
 *         name="Apache 2.0",
 *         url="http://www.apache.org/licenses/LICENSE-2.0.html"
 *     )
 * )
 * @OA\Tag(
 *     name="SoapCalculator",
 *     description="Пример взаимодействия с SOAP server native php",
 * )
 * @OA\Tag(
 *     name="FreeRestApi",
 *     description="Пример взаимодействия с Rest api native php",
 * )
 * @OA\Server(
 *     description="Laravel Swagger API server",
 *     url="http://localhost/api"
 * )
 * @OA\SecurityScheme(
 *     type="apiKey",
 *     in="header",
 *     name="X-APP-ID",
 *     securityScheme="X-APP-ID"
 * )
 */
class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    /**
     * Сокращает код на методах show, update, destroy
     *
     * @param  Model  $model  Объект модели, в которой будем искать запись
     * @param  string|int  $id  ID нужной записи
     * @param  string|null  $message
     * @return Model
     */
    protected function getEntityWithIdOrThrowException(Model $model, $id, $message = null): Model
    {
        try {
            return $model::query()->findOrFail($id);
        } catch (EloquentModelNotFoundException $e) {
            throw new EloquentModelNotFoundException($message);
        }
    }

    /**
     * Проверит, пришел ли от клиента параметр $parameter и совпал ли он хотя
     * бы с одним из ожидаемых нами значений массива $values. Если совпадений
     * нет, вернём оформленный json с кодом 400
     *
     * @param  string  $parameter Имя параметра
     * @param  array  $values Массив поддерживаемых значений в формате ['all', 'paginate', ...]
     *
     * @return bool
     */
    public static function requestHasParameterWithOneOfTheValues(string $parameter, array $values): bool
    {
        if (request()->has($parameter)) {
            foreach ($values as $val) {
                if (request($parameter) === $val) {
                    return true;
                }
            }
            throw new \Exception('Параметр "' . $parameter . '" получил не поддерживаемое значение');
        }

        return false;
    }

    /**
     * Возвращает название поля, которое будет использоваться в запросе вместе с предложением ORDER BY [возвращаемое_значение].
     * Если мы делаем выборку из одной таблицы, то пришедшее от клиента поле в параметре orderby равно названию колонки в
     * таблице (результат запроса будет верным), но бывают ситуации, когда у нас несколько сджоиненых таблиц и в некоторых
     * есть поле, названное одинаково в каждой (например CREATEDDATETIME в таблицах UKPROP и UKTABLE). В этом случае от
     * клиента приходит "CREATEDDATETIME", а сортировку надо сделать по полю UKPROP.CREATEDDATETIME. Если передать просто
     * "CREATEDDATETIME", сортировка может произойти по полю UKTABLE.CREATEDDATETIME. Для решения этой ситуации добавьте
     * ключ с названием параметра, пришедшего в запросе, а значением выступит поле в таблице. Пример:
     * [ 'CREATEDATETIME' => 'UKPROP.CREATEDATETIME', 'UKNAME', 'CEO', 'GUID' => 'UKTABLE.GUID' ],
     *
     * @param array $allowed_fields Массив разрешённых полей
     * @param string $default_column Поле для сортировки по-умолчанию. По-умолчанию: "id"
     * @return string
     */
    public function listGetOrderBy(array $allowed_fields, string $default_column = 'id'): string
    {
        foreach ($allowed_fields as $param_sended_by_client => $param_named_in_db_query) {
            if ($param_named_in_db_query === request('orderBy') || $param_sended_by_client === request('orderBy')) {
                return $param_named_in_db_query;
            }
        }

        return $default_column;
    }

    /**
     * Возвращает "ASC" или "DESC" для запроса
     *
     * @return string
     */
    public function listGetDirection($defaultDirection = 'asc'): string
    {
        return in_array(request('direction'), ['asc', 'desc']) ? request('direction') : $defaultDirection;
    }

    /**
     * Возвращает подготовленную для запроса в БД строку, по которой будет происходить поиск
     *
     * @return string
     */
    public function listGetSearchString(): string
    {
        return mb_strtolower(request('search'));
    }

    /**
     * @param  QueryBuilder|EloquentBuilder  $builder
     * @param  ResourceCollection|null  $collection
     * @return ResourceCollection
     */
    protected function prepareListResponse($builder, $collection = null): ResourceCollection
    {
        $collection = is_null($collection) ? ListResourceCollection::class : $collection;
        $request_page_size = request('pageSize');

        // На клиенте явно указано, что требуются все записи
        if ($request_page_size === '-1') {
            $total = ($builder instanceof EloquentBuilder)
                ? $builder->toBase()->getCountForPagination()
                : $builder->getCountForPagination();

            $data = ($builder instanceof QueryBuilder)
                ? $builder->get()->map(function ($item) {
                    return (array) $item;
                })
                : $builder->get();

            $paginator = new LengthAwarePaginator($data, $total, -1, 1, [
                'path' => Paginator::resolveCurrentPath()
            ]);

            $collection_data = $paginator;
        } else {
            $total = ($builder instanceof EloquentBuilder)
                ? $builder->toBase()->getCountForPagination()
                : $builder->getCountForPagination();

            $builder->forPage(request('page'), $request_page_size);
            $data = ($builder instanceof QueryBuilder)
                ? $builder->get()->map(function ($item) {
                    return (array) $item;
                })
                : $builder->get();

            $paginator = new LengthAwarePaginator($data, $total, $request_page_size, request('page'), [
                'path' => Paginator::resolveCurrentPath()
            ]);

            $collection_data = $paginator;
        }

        return new $collection($collection_data);
    }
}
