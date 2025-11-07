<?php

namespace Database\Seeders;

use App\Models\Unit;
use Illuminate\Database\Seeder;

class UnitSeeder extends Seeder
{
    public function run(): void
    {
        $units = ['Sekretariat', 'Kepegawaian', 'Keuangan', 'IT', 'Hukum'];
        foreach ($units as $u) {
            Unit::firstOrCreate(['nama_unit' => $u]);
        }
    }
}


