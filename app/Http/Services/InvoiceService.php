<?php

namespace App\Http\Services;

use App\Models\Invoice;
use App\Models\Client;
use App\Models\Item;

class InvoiceService
{

    public function store($data){

        // Create Invoice
        $invoice = new Invoice;
        $invoice->client_id = $data['client_id'];
        $invoice->status = $data['status'];
        $invoice->irpf = $data['irpf'];
        $invoice->vat = $data['vat'];
        $invoice->save();

        // Attach items
        $items = $data['items'];
        $invoice->items()->attach($items);

        return $invoice;

    }



    public function update(array $data, int $invoiceId)
    {
        // Find invoice
        $invoice = Invoice::findOrFail($invoiceId);

        // Update invoice
        $invoice->status = $data['status'];
        $invoice->irpf = $data['irpf'];
        $invoice->vat = $data['vat'];
        $invoice->update($data);

        // Sync Items
        $items = $data['items'];
        $invoice->items()->detach();
        $invoice->items()->attach($items);



        return $invoice;
    }
}
