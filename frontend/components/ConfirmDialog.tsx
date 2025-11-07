'use client'

type Props = {
  open: boolean
  title?: string
  message: string
  confirmText?: string
  cancelText?: string
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmDialog({ open, title = 'Konfirmasi', message, confirmText = 'OK', cancelText = 'Batal', onConfirm, onCancel }: Props) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} />
      <div className="relative z-10 w-full max-w-sm bg-white rounded-lg shadow-xl border border-secondary">
        <div className="px-4 py-3 border-b border-secondary">
          <h3 className="text-base font-semibold text-primary">{title}</h3>
        </div>
        <div className="px-4 py-4 text-sm text-primary">
          {message}
        </div>
        <div className="px-4 py-3 flex justify-end gap-2 border-t border-secondary">
          <button onClick={onCancel} className="px-3 py-2 border border-secondary text-primary rounded">{cancelText}</button>
          <button onClick={onConfirm} className="px-3 py-2 bg-accent text-white rounded hover:opacity-90">{confirmText}</button>
        </div>
      </div>
    </div>
  )
}



