<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Http\Resources\ItemResource;
use Spatie\QueryBuilder\QueryBuilder;
use App\Http\Resources\ItemCollection;
use App\Http\Requests\StoreItemRequest;
use App\Http\Requests\UpdateItemRequest;

class ItemsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $items = QueryBuilder::for(Item::class);
        return ItemCollection::make(
            $items
                ->allowedFilters(['name', 'description', 'price'])
                ->allowedSorts(['name', 'description', 'price', 'created_at'])
                ->jsonPaginate(100)
        );
    }

    /**
     * Returns items in JSON format
     *
     * @return App\Models\Item;
     */
    public function list()
    {
        $items = Item::orderBy('name', 'asc')->get();
        return $items->toJson();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  App\Http\Requests\StoreItemRequest; $request
     */
    public function store(StoreItemRequest $request): ItemResource
    {
        $item = Item::create($request->validated());
        return ItemResource::make($item);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Item $item): ItemResource
    {
        return ItemResource::make($item);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateItemRequest $request, $id)
    {
        $item = Item::findOrFail($id);
        $item->update($request->validated());
        return ItemResource::make($item);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Item $item)
    {
        $item->delete();
        return response()->json(null, 204);
    }
}
