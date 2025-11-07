<?php

namespace Database\Seeders;

use App\Models\Religion;
use Illuminate\Database\Seeder;

class ReligionSeeder extends Seeder
{
    public function run(): void
    {
        $religions = ['Islam','Kristen','Katolik','Hindu','Buddha','Konghucu'];
        foreach ($religions as $r) {
            Religion::firstOrCreate(['nama_agama' => $r]);
        }
    }
}


