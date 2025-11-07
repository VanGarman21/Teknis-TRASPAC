'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import type { Employee, Religion, Unit } from '@/lib/types'
import { api } from '@/lib/api'

type Props = {
  value?: Employee | null
  onSaved: () => void
  onCancel: () => void
  units: Unit[]
  religions: Religion[]
}

export default function EmployeeForm({ value, onSaved, onCancel, units, religions }: Props) {
  const [form, setForm] = useState<Employee>(() => value ?? { nip: '', nama: '' })
  const [fotoFile, setFotoFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setForm(value ?? { nip: '', nama: '' })
    setPreviewUrl(null)
    setFotoFile(null)
    if (fileRef.current) fileRef.current.value = ''
  }, [value])

  useEffect(() => {
    if (!fotoFile) return
    const reader = new FileReader()
    reader.onload = e => setPreviewUrl(String(e.target?.result ?? ''))
    reader.readAsDataURL(fotoFile)
  }, [fotoFile])

  const isEdit = useMemo(() => Boolean(value?.id), [value])

  function set<K extends keyof Employee>(key: K, v: Employee[K]) {
    setForm(prev => ({ ...prev, [key]: v }))
  }

  async function submit() {
    setLoading(true)
    try {
      const fd = new FormData()
      Object.entries(form).forEach(([k, v]) => {
        if (v !== undefined && v !== null) fd.append(k, String(v))
      })
      if (fotoFile) fd.append('foto', fotoFile)

      if (isEdit) {
        await api.post(`/employees/${value!.id}?_method=PUT`, fd, { headers: { 'Content-Type': 'multipart/form-data' } })
      } else {
        await api.post('/employees', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
      }
      onSaved()
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white p-4 rounded shadow space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <label>
          <div className="text-sm">NIP</div>
          <input value={form.nip ?? ''} onChange={e => set('nip', e.target.value)} className="mt-1 w-full border rounded px-3 py-2" required />
        </label>
        <label>
          <div className="text-sm">Nama</div>
          <input value={form.nama ?? ''} onChange={e => set('nama', e.target.value)} className="mt-1 w-full border rounded px-3 py-2" required />
        </label>
        <label>
          <div className="text-sm">JK</div>
          <div className="mt-1 flex gap-4">
            <label className="flex items-center gap-2">
              <input type="radio" name="jk" checked={form.jk === 'L'} onChange={() => set('jk', 'L')} /> L
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="jk" checked={form.jk === 'P'} onChange={() => set('jk', 'P')} /> P
            </label>
          </div>
        </label>
        <label>
          <div className="text-sm">Jabatan</div>
          <input value={form.jabatan ?? ''} onChange={e => set('jabatan', e.target.value)} className="mt-1 w-full border rounded px-3 py-2" />
        </label>
        <label>
          <div className="text-sm">Unit Kerja</div>
          <select value={form.unit_id ?? ''} onChange={e => set('unit_id', e.target.value ? Number(e.target.value) : null)} className="mt-1 w-full border rounded px-3 py-2">
            <option value="">Pilih Unit</option>
            {units.map(u => <option key={u.id} value={u.id}>{u.nama_unit}</option>)}
          </select>
        </label>
        <label>
          <div className="text-sm">Agama</div>
          <select value={form.religion_id ?? ''} onChange={e => set('religion_id', e.target.value ? Number(e.target.value) : null)} className="mt-1 w-full border rounded px-3 py-2">
            <option value="">Pilih Agama</option>
            {religions.map(r => <option key={r.id} value={r.id}>{r.nama_agama}</option>)}
          </select>
        </label>
        <label>
          <div className="text-sm">Tempat Lahir</div>
          <input value={form.tempat_lahir ?? ''} onChange={e => set('tempat_lahir', e.target.value)} className="mt-1 w-full border rounded px-3 py-2" />
        </label>
        <label>
          <div className="text-sm">Tanggal Lahir</div>
          <input type="date" value={form.tgl_lahir ?? ''} onChange={e => set('tgl_lahir', e.target.value)} className="mt-1 w-full border rounded px-3 py-2" />
        </label>
        <label>
          <div className="text-sm">No HP</div>
          <input value={form.no_hp ?? ''} onChange={e => set('no_hp', e.target.value)} className="mt-1 w-full border rounded px-3 py-2" />
        </label>
        <label>
          <div className="text-sm">NPWP</div>
          <input value={form.npwp ?? ''} onChange={e => set('npwp', e.target.value)} className="mt-1 w-full border rounded px-3 py-2" />
        </label>
        <label className="md:col-span-2">
          <div className="text-sm">Foto (jpg/png ≤ 2MB)</div>
          <input ref={fileRef} type="file" accept="image/*" onChange={e => setFotoFile(e.target.files?.[0] ?? null)} className="mt-1 block" />
          <div className="mt-2 flex items-center gap-4">
            {previewUrl ? (
              <img src={previewUrl} className="h-16 w-16 rounded object-cover" alt="preview" />
            ) : value?.foto ? (
              <img src={`http://localhost:8000/storage/${value.foto}`} className="h-16 w-16 rounded object-cover" alt={value.nama} />
            ) : (
              <div className="h-16 w-16 bg-gray-200 rounded" />
            )}
          </div>
        </label>
      </div>
      <div className="flex gap-2">
        <button onClick={submit} disabled={loading} className="px-4 py-2 bg-primary text-white rounded disabled:opacity-60 hover:opacity-90">{loading ? 'Menyimpan...' : 'Simpan'}</button>
        <button onClick={onCancel} className="px-4 py-2 border border-secondary text-primary rounded">Batal</button>
      </div>
    </div>
  )
}


