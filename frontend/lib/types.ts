export type User = { id: number; username: string; role?: string }
export type Unit = { id: number; nama_unit: string }
export type Religion = { id: number; nama_agama: string }
export type Employee = {
  id?: number
  nip: string
  nama: string
  tempat_lahir?: string | null
  tgl_lahir?: string | null
  jk?: 'L' | 'P' | null
  golongan?: string | null
  eselon?: string | null
  jabatan?: string | null
  tempat_tugas?: string | null
  religion_id?: number | null
  unit_id?: number | null
  no_hp?: string | null
  npwp?: string | null
  foto?: string | null
  unit?: Unit
  religion?: Religion
}
export type Paginated<T> = {
  data: T[]
  current_page: number
  last_page: number
  per_page: number
  total: number
}


