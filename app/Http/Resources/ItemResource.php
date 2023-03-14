<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;


class ItemResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'type' => 'item',
            'id' => (string) $this->resource->getRouteKey(),
            'attributes'=>[
                'name' => $this->resource->name,
                'description' => $this->resource->description,
                'price' => $this->resource->price,
                'created_at' => $this->resource->created_at,
                'updated_at' => $this->resource->updated_at,
            ],
            'links'=>[
                'self'=> route('items.show', $this->resource)
            ]
            ];
    }
}
