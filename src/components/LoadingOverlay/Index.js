import clsx from 'clsx'
import React from 'react'

export default function LoadingOverlay({label, className}) {
  return (
    <div className='overlay'>
      <span className={clsx(className, "px-4 py-2 text-gray-500 font-semibold")}>{label}</span>
    </div>
  )
}
