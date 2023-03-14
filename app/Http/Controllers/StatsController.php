<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Invoice;
use App\Models\Item;
use Illuminate\Http\Request;
use App\Http\Resources\StatsResource;

class StatsController extends Controller
{
    public function index(Request $request): StatsResource
    {
        return StatsResource::make($request);
    }
}
