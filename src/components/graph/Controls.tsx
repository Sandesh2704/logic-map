import { useCycleValidation } from "../../hooks/useCycleValidation"
import { Button } from "../ui/button"


export const Controls = () => {
  const { hasCycle } = useCycleValidation()

  return (
    <div className="absolute top-2 left-2 flex gap-2">
      <Button disabled={hasCycle}>
        Simulate Logic
      </Button>

      {hasCycle && (
        <span className="text-red-500 text-sm">
          Cycle detected
        </span>
      )}
    </div>
  )
}