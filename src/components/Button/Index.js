import clsx from 'clsx';

export default function Button({ children, className, variant, type = "button", ...props }) {
  const colorVariant = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white',
    danger: 'bg-red-500 hover:bg-red-600 text-white'
  }
  return (
    <button
      {...props}
      type={type}
      className={clsx(className, colorVariant[variant], "inline-block px-5 py-2 text-sm font-medium rounded-lg")}
    >
      {children}
    </button>
  )
}
