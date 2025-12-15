interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className=" bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
    >
      {children}
    </button>
  );
}
