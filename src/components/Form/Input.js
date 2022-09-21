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

function Form({ className, ...props }) {
  return (
    <div className="relative">
      <input
        className={clsx(
          className,
          'w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm',
        )}
        {...props}
      />
    </div>
  )
}

function Select({ className, children, ...props }) {
  return (
    <select
      {...props}
      className={clsx(
        className,
        ' border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 pr-12 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
      )}>
      {children}
    </select>
  )
}

function selectOption({children, ...props}) {
    return <option {...props}>{children}</option>
}

Input.label = Label
Input.form = Form
Input.select = Select
Input.option = selectOption

export default Input
