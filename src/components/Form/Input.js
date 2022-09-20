import clsx from 'clsx';
import React from 'react'

function Input({ children }) {
  return (
    <div>
      {children}
    </div>
  )
}

function Label({ children }) {
  return <label htmlFor={children} className="capitalize">{children}</label>
}

function Form({ className, ...props }) {
  return (
    <div className="relative">
      <input
        {...props}
        className={ clsx(className, "w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm")}
      />
    </div>
  )
}

Input.label = Label;
Input.form = Form;

export default Input;
