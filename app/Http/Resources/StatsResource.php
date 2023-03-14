<?php

namespace App\Http\Resources;

use App\Models\Item;
use App\Models\Client;
use App\Models\Invoice;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StatsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {

        return [
            'type' => 'stat',
            'attributes' => [
                'customers' => [
                    'total' => Client::count(),
                ],
                'invoices' => [
                    'total' => Invoice::count(),
                    'draft' => Invoice::countByState('draft'),
                    'paid'  => Invoice::countByState('paid'),
                    'unpaid'  => Invoice::countByState('pending_payment'),
                    'paymentsByYear' => Invoice::getPaymentsByMonthForYear(),
                ],
                'items' => [
                    'total' => Item::count()
                ]
            ],
            'links' => [
                'self' => route('stats')
            ]
        ];
    }
}
