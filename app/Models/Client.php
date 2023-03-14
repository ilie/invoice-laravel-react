<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Client extends Model
{
    use HasFactory, HasUuids;
    protected $fillable = ['name', 'cif', 'address', 'phone', 'email', 'contact_name', 'contact_phone'];

    public function invoices()
    {
        return $this->hasMany(Invoice::class);
    }

    public function scopeName(Builder $query, $name)
    {
        return $query->where('name', 'Like', '%' . $name . '%');
    }

    public function scopeCif(Builder $query, $cif)
    {
        return $query->where('cif', $cif);
    }
}
