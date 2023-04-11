<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Http\Services\InvoiceService;
use Spatie\QueryBuilder\QueryBuilder;
use App\Http\Resources\InvoiceResource;
use App\Http\Resources\InvoiceCollection;
use App\Http\Requests\InvoiceRequest;
use App\Http\Requests\UpdateInvoiceStatusRequest;
use Illuminate\Auth\Events\Validated;

class InvoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $invoices = QueryBuilder::for(Invoice::class);
        return InvoiceCollection::make(
            $invoices
                ->defaultSort('id')
                ->allowedFilters(['client.name', 'client.id', 'status', 'created_at', 'updated_at'])
                ->allowedSorts(['id', 'status', 'irpf', 'vat', 'created_at', 'updated_at'])
                ->jsonPaginate(100)
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return \Illuminate\Http\Response
     * @param  \App\Http\Requests\InvoiceRequest  $request
     */
    public function store(InvoiceRequest $request): InvoiceResource
    {
        $data = $request->validated();
        $newInvoice = (new InvoiceService)->store($data);
        return InvoiceResource::make($newInvoice);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Invoice  $invoice
     * @return \Illuminate\Http\Response
     */
    public function show(Invoice $invoice) //: InvoiceResource
    {
        return InvoiceResource::make($invoice);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Models\Invoice  $invoice
     * @return \App\Http\Resources\InvoiceResource
     * @param  \App\Http\Requests\InvoiceRequest  $request
     */
    public function update(InvoiceRequest $request, Invoice $invoice)
    {
        $data = $request->validated();
        $invoiceService = new InvoiceService();
        $updatedInvoice = $invoiceService->update($data, $invoice['id']);
        return InvoiceResource::make($updatedInvoice);
    }

    /**
     * Updates the invoice's status
     *
     * @param \App\Models\Invoice  $invoice
     * @param \App\Http\Requests\UpdateInvoiceStatusRequest $request
     * @return \App\Http\Resources\InvoiceResource
     */
    public function updateStatus(UpdateInvoiceStatusRequest $request, Invoice $invoice)
    {
        $newStatus = $request->Validated();
        $invoice->update($newStatus);
        return InvoiceResource::make($invoice);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Invoice  $invoice
     * @return \Illuminate\Http\Response
     */
    public function destroy(Invoice $invoice)
    {
        //
    }
}
