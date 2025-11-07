<?php

namespace App\Http\Controllers;

use App\Models\Religion;

class ReligionController extends Controller
{
    public function index()
    {
        return response()->json(Religion::orderBy('nama_agama')->get());
    }
}


