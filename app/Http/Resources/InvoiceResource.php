<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;


class InvoiceResource extends JsonResource
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
            'type' => 'invoice',
            'id' => (string) $this->resource->getRouteKey(),
            'attributes' => [
                'status' => $this->resource->status,
                'amount' => $this->resource->items->sum(function ($item) {
                    return $item->pivot->quantity * $item->price;
                }),
                'irpf' => $this->resource->irpf,
                'vat'=> $this->resource->vat,
                'created_at'=> $this->resource->created_at,
                'updated_at'=> $this->resource->updated_at,
            ],
            'relationships' => [
                'client' => [
                    'data' => [
                        'type' => 'client',
                        'id' => (string) $this->resource->client_id,
                        'attributes' => [
                            'name' => $this->resource->client->name,
                            'email' => $this->resource->client->email
                        ]
                    ],
                ],
                'items' => [
                    'data' => $this->resource->items->map(function ($item) {
                        return [
                            'type' => 'item',
                            'id' => (string) $item->id,
                            'attributes' => [
                                'name' => $item->name,
                                'description' => $item->description,
                                'price' => $item->price,
                                'date' => $item->pivot->date,
                                'quantity' => $item->pivot->quantity,
                                'created_at' => $item->pivot->created_at,
                                'updated_at' => $item->pivot->updated_at,
                            ],
                        ];
                    })->toArray(),
                ],
            ],
        'links'=>[
            'self'=> route('invoices.show', $this->resource)
        ]
        ];
    }
}
