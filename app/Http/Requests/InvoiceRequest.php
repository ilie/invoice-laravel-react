<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class InvoiceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'client_id' => 'required',
            'status'=>'required|in:draft,pending_payment,paid',
            'irpf' => 'required|integer',
            'vat' => 'required|integer',
            'items' => 'required|array',
            'items.*.item_id' => 'required|integer|exists:items,id',
            'items.*.date' => 'required|date',
            'items.*.quantity' => 'required|integer',
        ];
    }
}
