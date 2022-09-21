import baseUrl from '@/lib/baseUrl'
import Image from 'next/image'
import Button from '../Button/Index'

export default function List({ book, getBook, formik, handleDeleteBook }) {
  return (
    <article className="block overflow-hidden border border-gray-300 rounded-2xl">
      <div className="relative w-full h-60 rounded">
        <Image
          layout='fill'
          alt={book.name}
          src={book.image ? `${baseUrl}/images/${book.image}` : '/images/no-image.jpg'}
          objectFit='cover'
        />
      </div>
      <div className='p-5'>
        <div className='mb-5'>
          <span className='px-3 py-1 text-sm rounded-lg text-green-500 border border-green-500 w-auto text-center'>{book.category.name}</span>
        </div>
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
      </div>
    </article>
  )
}
