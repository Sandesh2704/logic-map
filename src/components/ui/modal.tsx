type Props = {
  open: boolean
  onClose: () => void
  children: React.ReactNode
}

export const Modal = ({ open, onClose, children }: Props) => {
  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-4 rounded min-w-[300px]">
        {children}
        <button onClick={onClose} className="mt-2 text-sm text-red-500">
          Close
        </button>
      </div>
    </div>
  )
}