type Props = React.ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({ children, ...props }: Props) => {
  return (
    <button
      className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
      {...props}
    >
      {children}
    </button>
  )
}