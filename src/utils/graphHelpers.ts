
import type { EdgeType, NodeType } from '../types/graph.types'
import { generateId } from './id'

export const createNode = (): NodeType => {
  return {
    id: generateId(),
    condition: ''
  }
}


export const createEdge = (from: string, to: string): EdgeType => {
  return {
    id: generateId(),
    from,
    to
  }
}


export const isDuplicateEdge = (
  edges: EdgeType[],
  from: string,
  to: string
) => {
  return edges.some((e) => e.from === from && e.to === to)
}

export const buildAdjList = (edges: EdgeType[]) => {
  const adj: Record<string, string[]> = {}

  for (const edge of edges) {
    if (!adj[edge.from]) adj[edge.from] = []
    adj[edge.from].push(edge.to)
  }

  return adj
}
