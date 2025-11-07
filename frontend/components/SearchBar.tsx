'use client'

type Props = {
  value: string
  onChange: (v: string) => void
  placeholder?: string
}
export default function SearchBar({ value, onChange, placeholder }: Props) {
  return (
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder ?? 'Cari nama/NIP...'}
      className="w-full md:w-64 border rounded px-3 py-2"
    />
  )
}


