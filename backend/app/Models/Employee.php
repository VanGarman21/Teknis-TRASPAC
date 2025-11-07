<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Employee extends Model
{
    protected $fillable = [
        'nip','nama','tempat_lahir','tgl_lahir','jk','golongan','eselon',
        'jabatan','tempat_tugas','religion_id','unit_id','no_hp','npwp','foto',
    ];

    protected $casts = [
        'tgl_lahir' => 'date',
    ];

    public function unit(): BelongsTo { return $this->belongsTo(Unit::class); }
    public function religion(): BelongsTo { return $this->belongsTo(Religion::class); }
}


