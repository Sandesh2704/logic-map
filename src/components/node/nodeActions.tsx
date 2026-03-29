import { useGraphStore } from "../../store/useGraphStore"
import { Plus, Trash2 } from "lucide-react"

type Props = {
  id: string
}

export const NodeActions = ({ id }: Props) => {
  const addNode = useGraphStore((s) => s.addNode)
  const addEdge = useGraphStore((s) => s.addEdge)
  const deleteNode = useGraphStore((s) => s.deleteNode)

  const handleAddChild = () => {
    const childId = addNode()
    addEdge(id, childId)
  }

  return (
    <div className="flex items-center justify-between mt-1">
  <button
    onClick={handleAddChild}
    className="
      flex items-center justify-center
      w-8 h-8
      bg-blue-500 hover:bg-blue-600
      text-white rounded-lg
      transition
    "
  >
    <Plus size={16} />
  </button>

  <button
    onClick={() => deleteNode(id)}
    className="
      flex items-center justify-center
      w-8 h-8
      bg-red-500 hover:bg-red-600
      text-white rounded-lg
      transition
    "
  >
    <Trash2 size={16} />
  </button>
</div>
  )
}

// import { useGraphStore } from "../../store/useGraphStore"
// import { Button } from "../ui/button"

// type Props = {
//   id: string
// }

// export const NodeActions = ({ id }: Props) => {
//   const addNode = useGraphStore((s) => s.addNode)
//   const addEdge = useGraphStore((s) => s.addEdge)
//   const deleteNode = useGraphStore((s) => s.deleteNode)

//   const handleAddChild = () => {
//     const childId = addNode()
//     addEdge(id, childId)
//   }

//   return (
//     <div className="flex gap-2">
//       <Button onClick={handleAddChild}>+ Child</Button>
//       <Button onClick={() => deleteNode(id)}>Delete</Button>
//     </div>
//   )
// }


