// store/graphStore.ts
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { v4 as uuidv4 } from 'uuid'

export type NodeType = {
  id: string
  condition: string
  position: { x: number; y: number }
}

export type EdgeType = {
  id: string
  from: string
  to: string
}

type GraphState = {
  nodes: Record<string, NodeType>
  edges: EdgeType[]

  addNode: () => string
  updateCondition: (id: string, value: string) => void
  addEdge: (from: string, to: string) => void
  deleteNode: (id: string) => void
  deleteEdge: (edgeId: string) => void
  updateNodePosition: (id: string, position: { x: number; y: number }) => void
  reset: () => void
}

export const useGraphStore = create<GraphState>()(
  persist(
    (set, get) => ({
      nodes: {},
      edges: [],

      addNode: () => {
        const id = uuidv4()
        
        set((state) => ({
          nodes: {
            ...state.nodes,
            [id]: {
              id,
              condition: '',
              position: {
                x: Math.random() * 400,
                y: Math.random() * 400,
              },
            }
          }
        }))
        
        return id
      },
      
      updateCondition: (id, value) => {
        set((state) => ({
          nodes: {
            ...state.nodes,
            [id]: {
              ...state.nodes[id],
              condition: value
            }
          }
        }))
      },

      addEdge: (from, to) => {
        const id = uuidv4()
        
        const exists = get().edges.some(
          (e) => e.from === from && e.to === to
        )
        
        if (exists) return
        
        set((state) => ({
          edges: [...state.edges, { id, from, to }]
        }))
      },

      deleteNode: (id) => {
        set((state) => {
          const newNodes = { ...state.nodes }
          delete newNodes[id]
          
          const newEdges = state.edges.filter(
            (e) => e.from !== id && e.to !== id
          )
          
          return {
            nodes: newNodes,
            edges: newEdges
          }
        })
      },

      deleteEdge: (edgeId) => {
        set((state) => ({
          edges: state.edges.filter((e) => e.id !== edgeId)
        }))
      },

      updateNodePosition: (id, position) => {
        set((state) => ({
          nodes: {
            ...state.nodes,
            [id]: {
              ...state.nodes[id],
              position
            }
          }
        }))
      },

      reset: () => {
        set({
          nodes: {},
          edges: []
        })
      },
    }),
    {
      name: 'graph-storage', // unique name for localStorage
      storage: createJSONStorage(() => localStorage), // use localStorage
      // Optional: only persist specific parts of the state
      // partialize: (state) => ({ nodes: state.nodes, edges: state.edges }),
    }
  )
)


// import { create } from 'zustand'
// import { v4 as uuidv4 } from 'uuid'


// export type NodeType = {
//   id: string
//   condition: string
//   position: { x: number; y: number }
// }

// export type EdgeType = {
//   id: string
//   from: string
//   to: string
// }

// type GraphState = {
//   nodes: Record<string, NodeType>
//   edges: EdgeType[]

//   addNode: () => string
//   updateCondition: (id: string, value: string) => void

//   addEdge: (from: string, to: string) => void
//   deleteNode: (id: string) => void
//   deleteEdge: (edgeId: string) => void,

//     updateNodePosition: (id: string, position: { x: number; y: number }) => void;

    

//   reset: () => void
// }

// export const useGraphStore = create<GraphState>((set, get) => ({
//   nodes: {},
//   edges: [],

//  addNode: () => {
//   const id = uuidv4()

//   set((state) => ({
//     nodes: {
//       ...state.nodes,
//       [id]: {
//         id,
//         condition: '',
//         position: {
//           x: Math.random() * 400,
//           y: Math.random() * 400,
//         },
//       }
//     }
//   }))

//   return id
// },
//   updateCondition: (id, value) => {
//     set((state) => ({
//       nodes: {
//         ...state.nodes,
//         [id]: {
//           ...state.nodes[id],
//           condition: value
//         }
//       }
//     }))
//   },

//   addEdge: (from, to) => {
//     const id = uuidv4()

//     const exists = get().edges.some(
//       (e) => e.from === from && e.to === to
//     )

//     if (exists) return

//     set((state) => ({
//       edges: [...state.edges, { id, from, to }]
//     }))
//   },

//   deleteNode: (id) => {
//     set((state) => {
//       const newNodes = { ...state.nodes }
//       delete newNodes[id]

//       const newEdges = state.edges.filter(
//         (e) => e.from !== id && e.to !== id
//       )

//       return {
//         nodes: newNodes,
//         edges: newEdges
//       }
//     })
//   },

//   deleteEdge: (edgeId) => {
//     set((state) => ({
//       edges: state.edges.filter((e) => e.id !== edgeId)
//     }))
//   },

//   reset: () => {
//     set({
//       nodes: {},
//       edges: []
//     })
//   },

    
//   updateNodePosition: (id, position) => {
//     set((state) => ({
//       nodes: {
//         ...state.nodes,
//         [id]: {
//           ...state.nodes[id],
//           position
//         }
//       }
//     }))
//   },
// }))


