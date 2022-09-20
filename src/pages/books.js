import BookForm from '@/components/Book/Form'
import AppLayout from '@/components/Layouts/AppLayout'
import axios from '@/lib/axios'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Book() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL

  async function fetchBook() {
    try {
      setLoading(true)
      const response = await axios.get(`${baseUrl}/api/books`)
      setBooks(response.data.data)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBook()
  }, [])

  function handleAddBook({ book }) {
    setBooks(prev => [book, ...prev])
  }

  return (
    <AppLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Books
        </h2>
      }>
      <Head>
        <title>Laravel - Books</title>
      </Head>

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <BookForm handleAddBook={handleAddBook} />
            <div className="p-6 bg-white border-b border-gray-200">
              {error && <div>{error}</div>}
              {loading ? (
                <div>Loading</div>
              ) : (
                books.map(book => (
                  <Link key={book.id} href={`/books/${book.id}`}>
                    <p className='cursor-pointer text-blue-300 hover:text-blue-600'>{book.id}. {book.name}</p>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
