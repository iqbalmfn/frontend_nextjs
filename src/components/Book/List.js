import React from 'react'
import Button from '../Button/Index'

export default function List({ book, getBook, formik, handleDeleteBook, books }) {
  return (
    <article className="relative block p-8 border border-gray-100 shadow rounded-xl">
      <div className="mt-4 text-gray-500">
        <h5 className="mt-4 text-xl font-bold text-gray-900">{book.name}</h5>
        <p className="mt-2 text-sm line-clamp-3">
          {book.description}
        </p>
        <div className='my-2 border-b-2'></div>
        <div className='flex justify-end mt-3'>
          <Button variant="primary" onClick={getBook.bind(this, book.id)} formik={formik}>Edit</Button>
          <Button variant="danger" className="ml-2" onClick={handleDeleteBook.bind(this, book.id, book.name)}>Delete</Button>
        </div>
      </div>
    </article>
  )
}
