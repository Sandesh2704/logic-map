

import { useGraphStore } from "../../store/useGraphStore"

type Props = {
  id: string
  value: string
}

export const NodeInput = ({ id, value }: Props) => {
  const updateCondition = useGraphStore((s) => s.updateCondition)

  return (
  <textarea
  className="
    w-full resize-none
    border border-gray-200
    px-3 py-2 rounded-lg
    text-sm
    focus:outline-none focus:ring-2 focus:ring-blue-500
    placeholder:text-gray-400
  "
  rows={3}
  value={value}
  onChange={(e) => updateCondition(id, e.target.value)}
  placeholder="Condition..."
/>
  )
}