<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ItemsController;
use App\Http\Controllers\ClientsController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\StatsController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Stats
Route::get('/stats', [StatsController::class, 'index'])->name('stats');

// Clients
Route::prefix('clients')->group(function () {
    Route::get('/', [ClientsController::class, 'index'])->name('clients.index');
    Route::post('/', [ClientsController::class, 'store'])->name('clients.store');
    Route::get('/{client}', [ClientsController::class, 'show'])->name('clients.show');
    Route::put('/{client}', [ClientsController::class, 'update'])->name('clients.update');
    Route::delete('/{client}', [ClientsController::class, 'destroy'])->name('clients.destroy');
});

// Items
Route::prefix('items')->group(function () {
    Route::get('/', [ItemsController::class, 'index'])->name('items.index');
    Route::post('/', [ItemsController::class, 'store'])->name('items.store');
    Route::get('/list', [ItemsController::class, 'list'])->name('items.list');
    Route::get('/{item}', [ItemsController::class, 'show'])->name('items.show');
    Route::put('/{item}', [ItemsController::class, 'update'])->name('items.update');
    Route::delete('/{item}', [ItemsController::class, 'destroy'])->name('items.destroy');
});

// Invoices
Route::prefix('invoices')->group(function () {
    Route::get('/', [InvoiceController::class, 'index'])->name('invoices.index');
    Route::post('/', [InvoiceController::class, 'store'])->name('invoices.store');
    Route::get('/{invoice}', [InvoiceController::class, 'show'])->name('invoices.show');
    Route::put('/{invoice}', [InvoiceController::class, 'update'])->name('invoices.update');
    Route::put('/update-status/{invoice}', [InvoiceController::class, 'updateStatus'])->name('invoices.updateStatus');
});
