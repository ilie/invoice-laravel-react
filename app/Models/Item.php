<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'description', 'price'];
    public function invoices(){
        return $this->belongsToMany(Invoice::class)->withPivot('date','quantity')->withTimestamps();
    }
}
