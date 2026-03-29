
import { Handle, Position } from 'reactflow'
import { NodeInput } from './nodeInput'
import { NodeActions } from './nodeActions'
export const LogicNode = ({ data }: any) => {
  const { id, condition, isCycle } = data

  return (
    <div
      className={`
        min-w-[200px] max-w-[240px]
        p-4 rounded-2xl border
        bg-white shadow-md
        transition-all
        ${isCycle 
          ? "border-red-400 bg-red-50 shadow-red-100" 
          : "border-gray-200 hover:shadow-lg"}
      `}
    >
      <Handle type="target" position={Position.Top} />

      <div className="flex flex-col gap-3">
        <NodeInput id={id} value={condition} />
        <NodeActions id={id} />
      </div>

      <Handle type="source" position={Position.Bottom} />
    </div>
  )
}