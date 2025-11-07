'use client'

import type { Employee } from '@/lib/types'

type Props = {
  data: Employee[]
  onEdit: (row: Employee) => void
  onDelete: (row: Employee) => void
}
export default function DataTable({ data, onEdit, onDelete }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded shadow">
        <thead>
          <tr className="text-left text-sm bg-secondary text-[#0b2a33]">
            <th className="p-3">Foto</th>
            <th className="p-3">NIP</th>
            <th className="p-3">Nama</th>
            <th className="p-3">Unit</th>
            <th className="p-3">Agama</th>
            <th className="p-3">Jabatan</th>
            <th className="p-3">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map(emp => (
            <tr key={emp.id} className="border-t">
              <td className="p-3">
                {emp.foto ? <img src={`http://localhost:8000/storage/${emp.foto}`} alt={emp.nama} className="h-10 w-10 rounded object-cover" /> : <div className="h-10 w-10 bg-gray-200 rounded" />}
              </td>
              <td className="p-3">{emp.nip}</td>
              <td className="p-3">{emp.nama}</td>
              <td className="p-3">{emp.unit?.nama_unit ?? '-'}</td>
              <td className="p-3">{emp.religion?.nama_agama ?? '-'}</td>
              <td className="p-3">{emp.jabatan ?? '-'}</td>
              <td className="p-3">
                <div className="flex gap-2">
                  <button onClick={() => onEdit(emp)} className="px-2 py-1 text-xs bg-primary text-white rounded">Edit</button>
                  <button onClick={() => onDelete(emp)} className="px-2 py-1 text-xs bg-accent text-white rounded">Hapus</button>
                </div>
              </td>
            </tr>
          ))}
          {data.length === 0 && (
            <tr><td colSpan={7} className="p-3 text-center text-gray-500">Tidak ada data</td></tr>
          )}
        </tbody>
      </table>
    </div>
  )
}


