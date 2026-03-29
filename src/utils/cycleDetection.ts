
import type { EdgeType } from '../types/graph.types'
import { buildAdjList } from './graphHelpers'


export const detectCycle = (edges: EdgeType[]) => {
  const adj = buildAdjList(edges)

  const visited = new Set<string>()
  const visiting = new Set<string>()
  const cycleNodes = new Set<string>()

  const dfs = (node: string): boolean => {
    if (visiting.has(node)) {
      cycleNodes.add(node)
      return true
    }

    if (visited.has(node)) return false

    visiting.add(node)

    const neighbors = adj[node] || []

    for (const neighbor of neighbors) {
      if (dfs(neighbor)) {
        cycleNodes.add(node)
        return true
      }
    }

    visiting.delete(node)
    visited.add(node)

    return false
  }

  for (const node in adj) {
    if (!visited.has(node)) {
      if (dfs(node)) {
        return {
          hasCycle: true,
          cycleNodes
        }
      }
    }
  }

  return {
    hasCycle: false,
    cycleNodes: new Set<string>()
  }
}