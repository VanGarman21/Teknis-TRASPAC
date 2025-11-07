<?php

namespace Database\Seeders;

use App\Models\Employee;
use App\Models\Religion;
use App\Models\Unit;
use Illuminate\Database\Seeder;

class EmployeeSeeder extends Seeder
{
    public function run(): void
    {
        $unit = Unit::inRandomOrder()->first();
        $religion = Religion::inRandomOrder()->first();

        for ($i = 1; $i <= 25; $i++) {
            Employee::firstOrCreate(
                ['nip' => str_pad((string) $i, 18, '0', STR_PAD_LEFT)],
                [
                    'nama' => "Pegawai {$i}",
                    'jk' => $i % 2 === 0 ? 'L' : 'P',
                    'golongan' => 'III/a',
                    'eselon' => 'IV/a',
                    'jabatan' => 'Staff',
                    'tempat_tugas' => 'Kantor Pusat',
                    'unit_id' => $unit?->id,
                    'religion_id' => $religion?->id,
                    'no_hp' => '08123456789',
                    'npwp' => '09.123.456.7-890.000',
                ]
            );
        }
    }
}


