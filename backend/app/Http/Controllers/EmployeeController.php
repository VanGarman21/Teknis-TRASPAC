<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class EmployeeController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');
        $unitId = $request->query('unit_id');
        $perPage = (int) ($request->query('per_page', 10));

        $query = Employee::with(['unit','religion'])
            ->when($search, function ($q) use ($search) {
                $q->where(function ($qq) use ($search) {
                    $qq->where('nama', 'like', "%{$search}%")
                        ->orWhere('nip', 'like', "%{$search}%");
                });
            })
            ->when($unitId, fn($q) => $q->where('unit_id', $unitId))
            ->orderBy('nama');

        return response()->json($query->paginate($perPage));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'nip' => ['required','string','unique:employees,nip'],
            'nama' => ['required','string'],
            'jk' => ['nullable', Rule::in(['L','P'])],
            'tempat_lahir' => ['nullable','string'],
            'tgl_lahir' => ['nullable','date'],
            'golongan' => ['nullable','string'],
            'eselon' => ['nullable','string'],
            'jabatan' => ['nullable','string'],
            'tempat_tugas' => ['nullable','string'],
            'religion_id' => ['nullable','exists:religions,id'],
            'unit_id' => ['nullable','exists:units,id'],
            'no_hp' => ['nullable','string'],
            'npwp' => ['nullable','string'],
            'foto' => ['nullable','file','image','max:2048'],
        ]);

        if ($request->hasFile('foto')) {
            $data['foto'] = $request->file('foto')->store('employees', 'public');
        }

        $employee = Employee::create($data);
        return response()->json($employee->load(['unit','religion']), 201);
    }

    public function show(Employee $employee)
    {
        return response()->json($employee->load(['unit','religion']));
    }

    public function update(Request $request, Employee $employee)
    {
        $data = $request->validate([
            'nip' => ['required','string', Rule::unique('employees','nip')->ignore($employee->id)],
            'nama' => ['required','string'],
            'jk' => ['nullable', Rule::in(['L','P'])],
            'tempat_lahir' => ['nullable','string'],
            'tgl_lahir' => ['nullable','date'],
            'golongan' => ['nullable','string'],
            'eselon' => ['nullable','string'],
            'jabatan' => ['nullable','string'],
            'tempat_tugas' => ['nullable','string'],
            'religion_id' => ['nullable','exists:religions,id'],
            'unit_id' => ['nullable','exists:units,id'],
            'no_hp' => ['nullable','string'],
            'npwp' => ['nullable','string'],
            'foto' => ['nullable','file','image','max:2048'],
        ]);

        if ($request->hasFile('foto')) {
            if ($employee->foto) {
                Storage::disk('public')->delete($employee->foto);
            }
            $data['foto'] = $request->file('foto')->store('employees', 'public');
        }

        $employee->update($data);
        return response()->json($employee->load(['unit','religion']));
    }

    public function destroy(Employee $employee)
    {
        if ($employee->foto) {
            Storage::disk('public')->delete($employee->foto);
        }
        $employee->delete();
        return response()->noContent();
    }
}


