## 🧠 Data Structure & Cycle Detection

### 1. Data Structure Choice: Normalized (Not Nested)

I used a **normalized graph structure** instead of a nested tree.

#### Structure

```ts
nodes: {
  [id]: {
    id: string
    position: { x: number; y: number }
    condition: string
  }
}

edges: {
  id: string
  from: string
  to: string
}[]
```

#### Why NOT Nested?

A nested structure (tree-like) fails for real graph use cases:

* ❌ Cannot handle multiple parents (DAG breaks)
* ❌ Hard to update deep nodes (O(n) traversal)
* ❌ Edge management becomes implicit and messy
* ❌ Cycle detection becomes complex and inefficient

#### Why Normalized Works Better

* ✅ O(1) access to any node
* ✅ Explicit edge control (clear graph relationships)
* ✅ Easy to add/remove/update nodes
* ✅ Scales to large graphs
* ✅ Works with React Flow naturally

This matches how real systems (like DAG engines, workflow builders, n8n) manage graph data.

---

### 2. Cycle Detection Algorithm

Cycle detection is implemented using **Depth-First Search (DFS)**.

#### Core Idea

Track traversal using:

* `visited` → nodes already processed
* `recStack` → current DFS path

If a node is revisited while still in `recStack`, a cycle exists.

#### Implementation

```ts
const detectCycles = (nodes, edges) => {
  const visited = new Set<string>()
  const recStack = new Set<string>()
  const cycleNodes = new Set<string>()

  const adjacency = {}

  edges.forEach((e) => {
    if (!adjacency[e.from]) adjacency[e.from] = []
    adjacency[e.from].push(e.to)
  })

  const dfs = (nodeId: string) => {
    if (recStack.has(nodeId)) {
      cycleNodes.add(nodeId)
      return true
    }

    if (visited.has(nodeId)) return false

    visited.add(nodeId)
    recStack.add(nodeId)

    const neighbors = adjacency[nodeId] || []

    for (const neighbor of neighbors) {
      if (dfs(neighbor)) {
        cycleNodes.add(nodeId)
        return true
      }
    }

    recStack.delete(nodeId)
    return false
  }

  Object.keys(nodes).forEach((id) => {
    if (!visited.has(id)) dfs(id)
  })

  return cycleNodes
}
```

---

### 3. Why DFS (and not BFS / brute force)

* DFS is optimal for cycle detection in directed graphs
* Time Complexity: **O(V + E)**
* Minimal memory overhead
* Easy to track path using recursion stack

---

### 4. Integration with UI

* Cycle nodes are stored in a `Set`
* Each node checks: `isCycle = cycleNodes.has(node.id)`
* UI highlights cycle nodes (red border / warning icon)

---


### 5. Key Design Decisions

* Graph stored in Zustand (with persistence)
* Separation of nodes & edges (normalized)
* UI (React Flow) is derived from store → single source of truth
* Cycle detection runs as a derived computation (not stored permanently)

---

### 6. Limitations

* LocalStorage persistence → not suitable for very large graphs
* DFS recalculates on every change (can be optimized with memoization)
* No server sync (currently client-only)

---

### 7. Future Improvements

* Incremental cycle detection (instead of full recompute)
* Graph validation rules (prevent invalid edges before adding)
* Backend persistence (save/load workflows)
* Auto layout (Dagre / ELK)
