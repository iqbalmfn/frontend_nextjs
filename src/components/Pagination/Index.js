import clsx from "clsx"

function Pagination({ children }) {
  return (
    <div className='flex gap-2'>
      {children}
    </div>
  )
}

function Nav({ chldren, className, active = false, disabled = false, ...props }) {
  const classActive = "bg-blue-500 text-white"
  const classDisabled = "bg-slate-50 text-blue-300 border-blue-300"
  return (
    <button
      {...props}
      disabled={disabled}
      className={clsx(
        className, 
        (active ? classActive : 'text-blue-500 border-blue-500'),
        (disabled ? classDisabled : 'hover:bg-blue-500 hover:text-white'), 
        "border rounded px-2 py-1 text-sm")}>
    </button>
  )
}

Pagination.nav = Nav

export default Pagination