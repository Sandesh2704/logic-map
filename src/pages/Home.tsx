import { Controls } from "../components/graph/Controls"
import { FlowCanvas } from "../components/graph/FlowCanvas"
import { Button } from "../components/ui/button"
import { useGraphStore } from "../store/useGraphStore"


const Home = () => {
  const addNode = useGraphStore((s) => s.addNode)
  const reset = useGraphStore((s) => s.reset)

  return (
    <div className="w-full h-screen relative">
      {/* Top Controls */}
      <div className="absolute top-2 right-2 z-10 flex gap-2">
        <Button onClick={addNode}>+ Add Node</Button>
        <Button onClick={reset}>Reset</Button>
      </div>

      {/* Cycle + Simulate Controls */}
      <Controls />

      {/* Graph */}
      <FlowCanvas />
    </div>
  )
}

export default Home