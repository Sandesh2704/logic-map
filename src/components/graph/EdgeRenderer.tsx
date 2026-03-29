import {  getBezierPath, type EdgeProps } from 'reactflow'

export const EdgeRenderer = (props: EdgeProps) => {
  const [path] = getBezierPath(props)

  return (
    <path
      d={path}
      stroke="#555"
      strokeWidth={2}
      fill="none"
    />
  )
}