import { useEffect, useState } from 'react'
import { useGraphStore } from '../store/useGraphStore'
import { detectCycle } from '../utils/cycleDetection'

export const useCycleValidation = () => {
  const edges = useGraphStore((s) => s.edges)

  const [hasCycle, setHasCycle] = useState(false)
  const [cycleNodes, setCycleNodes] = useState<Set<string>>(new Set())

  useEffect(() => {
    const result = detectCycle(edges)
    setHasCycle(result.hasCycle)
    setCycleNodes(result.cycleNodes)
  }, [edges])

  return { hasCycle, cycleNodes }
}