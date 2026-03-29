export type NodeType = {
  id: string
  condition: string
}

export type EdgeType = {
  id: string
  from: string
  to: string
}

export type GraphType = {
  nodes: Record<string, NodeType>
  edges: EdgeType[]
}