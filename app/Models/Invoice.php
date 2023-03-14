<?php

namespace App\Models;

use App\Models\Item;
use App\Models\Client;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Invoice extends Model
{
    use HasFactory;

    protected $fillable = ['client_id', 'status', 'irpf', 'vat'];

    public function items()
    {
        return $this->belongsToMany(Item::class)->withPivot('date', 'quantity')->withTimestamps();
    }

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public static function countByState($state)
    {
        return self::where('status', $state)->count();
    }


    public static function getPaymentsByMonthForYear($date = null)
    {
        $start = $date ? Carbon::parse($date)->startOfYear() : Carbon::now()->startOfYear();
        $end = $date ? Carbon::parse($date)->endOfYear() : Carbon::now()->endOfYear();

        $invoices = self::whereBetween('created_at', [$start, $end])->get();

        $currentYear = [];
        $previousYear = [];

        // iterate through each invoice
        foreach ($invoices as $invoice) {
            $items = $invoice->items;

            $totalCost = 0;

            // iterate through each item in the invoice and calculate the total cost
            foreach ($items as $item) {
                $totalCost += $item->price * $item->pivot->quantity;
            }

            $paymentMonth = Carbon::parse($invoice->created_at)->month;

            // store the payment for the current year or the previous year
            if ($paymentMonth >= $start->month && $paymentMonth <= $end->month) {
                if (isset($currentYear[$paymentMonth])) {
                    $currentYear[$paymentMonth] += $totalCost;
                } else {
                    $currentYear[$paymentMonth] = $totalCost;
                }
            } else {
                if (isset($previousYear[$paymentMonth])) {
                    $previousYear[$paymentMonth] += $totalCost;
                } else {
                    $previousYear[$paymentMonth] = $totalCost;
                }
            }
        }

        // create an array of month numbers for the current year and the previous year
        $currentYearMonths = range($start->month, $end->month);
        $previousYearMonths = range($start->subYear()->month, $end->subYear()->month);

        // fill in any missing months with zero values for the current year
        foreach ($currentYearMonths as $month) {
            if (!isset($currentYear[$month])) {
                $currentYear[$month] = 0;
            }
        }

        // fill in any missing months with zero values for the previous year
        foreach ($previousYearMonths as $month) {
            if (!isset($previousYear[$month])) {
                $previousYear[$month] = 0;
            }
        }

        // sort the arrays by month number
        ksort($currentYear);
        ksort($previousYear);

        return [
            'currentYear' => array_values($currentYear),
            'previousYear' => array_values($previousYear),
        ];
    }
}
