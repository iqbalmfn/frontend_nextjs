import clsx from 'clsx'

function Input({ children }) {
  return <div>{children}</div>
}

function Label({ children }) {
  return (
    <label htmlFor={children} className="capitalize">
      {children}
    </label>
  )
}

function Form({ className, name, required, register, ...props }) {
  return (
    <div className="relative">
      <input
        {...register(name)}
        {...props}
        className={clsx(
          className,
          'w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm',
        )}
      />
    </div>
  )
}

const Select = React.forwardRef({ className, children, ...props }, ref) => {
  return (
    <select
      {...props}
      className={clsx(
        className,
        ' border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 pr-12',
      )}>
      {children}
    </select>
  )
}

function File({ className, ...props }) {
  return (
    <input 
      {...props} 
      className={clsx(className, "block p-4 pr-12 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer")} 
      type="file" />
  )
}

function selectOption({ children, ...props }) {
  return <option {...props}>{children}</option>
}

Input.label = Label
Input.form = Form
Input.select = Select
Input.option = selectOption
Input.file = File

export default Input
