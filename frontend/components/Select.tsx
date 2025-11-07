'use client'

type Option = { value: string | number; label: string }
type Props = {
  value: string | number | undefined
  onChange: (v: string) => void
  options: Option[]
  placeholder?: string
}
export default function Select({ value, onChange, options, placeholder }: Props) {
  return (
    <select value={value ?? ''} onChange={e => onChange(e.target.value)} className="border rounded px-3 py-2">
      <option value="">{placeholder ?? 'Semua'}</option>
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  )
}


