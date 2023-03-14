<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ClientResource extends JsonResource
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
            'type' => 'client',
            'id' => (string) $this->resource->getRouteKey(),
            'attributes' => [
                'name' => $this->resource->name,
                'cif' => $this->resource->cif,
                'address' => $this->resource->address,
                'phone' => $this->resource->phone,
                'email' => $this->resource->email,
                'contact_name' => $this->resource->contact_name,
                'contact_phone' => $this->resource->contact_phone,
                'created_at' => $this->resource->created_at,
                'updated_at' => $this->resource->updated_at,
            ],
            'links' => [
                'self' => route('clients.show', $this->resource)
            ]
        ];
    }
}
