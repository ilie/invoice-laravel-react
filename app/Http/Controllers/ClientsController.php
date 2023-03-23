<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Http\Requests\ClientRequest;
use App\Http\Requests\ClientUpdateRequest;
use Spatie\QueryBuilder\QueryBuilder;
use App\Http\Resources\ClientResource;
use App\Http\Resources\ClientCollection;

class ClientsController extends Controller
{
    // Get clients
    public function index(): ClientCollection
    {
        $clients = QueryBuilder::for(Client::class);
        return ClientCollection::make(
            $clients
                ->allowedFilters(['id', 'name', 'cif', 'address', 'email', 'contact_name', 'contact_phone'])
                ->allowedSorts(['name', 'cif', 'email', 'contact_name', 'contact_phone', 'created_at'])
                ->jsonPaginate(100)
        );
    }

    // Get a client
    public function show(Client $client): ClientResource
    {
        return ClientResource::make($client);
    }


    // Store a client
    public function store(ClientRequest $request): ClientResource
    {
        $validated = $request->validated();
        $client = Client::create($validated);
        return ClientResource::make($client);
    }

    // Update a cliente
    public function update(ClientUpdateRequest $request, $id): ClientResource
    {
        $client = Client::findOrFail($id);
        $client->update($request->validated());
        return ClientResource::make($client);
    }

    // Delete a client
    public function destroy(Client $client)
    {
        $client->delete();
        return response()->json(null, 204);
    }
}
