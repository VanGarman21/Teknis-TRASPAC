<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Unit extends Model
{
    protected $fillable = ['nama_unit'];

    public function employees(): HasMany
    {
        return $this->hasMany(Employee::class);
    }
}


