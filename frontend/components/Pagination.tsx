'use client'

type Props = {
  page: number
  totalPages: number
  onPrev: () => void
  onNext: () => void
}
export default function Pagination({ page, totalPages, onPrev, onNext }: Props) {
  return (
    <div className="flex items-center gap-3">
      <button onClick={onPrev} disabled={page <= 1} className="px-3 py-1 border rounded disabled:opacity-50">Prev</button>
      <span className="text-sm">Page {page} / {totalPages}</span>
      <button onClick={onNext} disabled={page >= totalPages} className="px-3 py-1 border rounded disabled:opacity-50">Next</button>
    </div>
  )
}


