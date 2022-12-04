<?php

namespace App\Http\Resources\Common;

use Illuminate\Http\Resources\Json\ResourceCollection;
use stdClass;

class ListResourceCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param $request
     * @return array
     */
    public function toArray($request): array
    {
        // $this->with = ['status' => 'success'];
        $example = $this->collection->first();
        if (is_array($example)) {
            return $this->collection->toArray();
        } elseif ($example instanceof stdClass) {
            return $this->collection->map(function ($i) {
                return (array) $i;
            })->toArray();
        } else {
            return parent::toArray($request);
        }
    }
}
