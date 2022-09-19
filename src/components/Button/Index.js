import clsx from 'clsx';

export default function Button({ children, className, type = "button", ...props }) {
  return (
    <button
      {...props}
      type={type}
      className={clsx(className, "inline-block px-5 py-3 text-sm font-medium rounded-lg")}
    >
      {children}
    </button>
  )
}
