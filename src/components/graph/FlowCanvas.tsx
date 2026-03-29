
import ReactFlow, {
  Background,
  Controls as FlowControls,
  MiniMap,
  type NodeChange,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { useGraphStore } from '../../store/useGraphStore'
import { useCycleValidation } from '../../hooks/useCycleValidation'
import { LogicNode } from '../node/logicNode'
import { useMemo, useCallback } from 'react'

export const FlowCanvas = () => {
  const nodes = useGraphStore((s) => s.nodes)
  const edges = useGraphStore((s) => s.edges)
  const addEdge = useGraphStore((s) => s.addEdge)
  const updateNodePosition = useGraphStore((s) => s.updateNodePosition) 

  const { cycleNodes } = useCycleValidation()

  const rfNodes = useMemo(() => {
    return Object.values(nodes).map((node) => ({
      id: node.id,
      type: 'logicNode',
      position: node.position,
      data: {
        id: node.id,
        condition: node.condition,
        isCycle: cycleNodes.has(node.id),
      },
    }))
  }, [nodes, cycleNodes])

  const rfEdges = useMemo(() => {
    return edges.map((e) => ({
      id: e.id,
      source: e.from,
      target: e.to,
    }))
  }, [edges])

  const nodeTypes = useMemo(() => ({
    logicNode: LogicNode,
  }), [])

  const onConnect = (params: any) => {
    addEdge(params.source, params.target)
  }

  const onNodesChange = useCallback((changes: NodeChange[]) => {

    const positionChanges = changes.filter(
      (change) => change.type === 'position' && change.position
    )
    
    positionChanges.forEach((change) => {
      if (change.type === 'position' && change.position && change.id) {
        updateNodePosition(change.id, change.position)
      }
    })
  }, [updateNodePosition])

  return (
    <div className="w-full h-screen">
      <ReactFlow
        nodes={rfNodes}
        edges={rfEdges}
        nodeTypes={nodeTypes}
        onConnect={onConnect}
        onNodesChange={onNodesChange}
        fitView
      >
        <Background />
        <FlowControls />
        <MiniMap />
      </ReactFlow>
    </div>
  )
}