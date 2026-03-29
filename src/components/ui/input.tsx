type Props = React.InputHTMLAttributes<HTMLInputElement>

export const Input = (props: Props) => {
  return (
    <input
      className="border px-2 py-1 rounded w-full text-sm"
      {...props}
    />
  )
}