import useBook from '@/components/Book/BookHook'
import BookForm from '@/components/Book/Form'
import BookList from '@/components/Book/List'
import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'

export default function Book() {
  const {
    formik,
    books,
    bookLoading,
    bookError,
    bookSubmit,
    handleDeleteBook,
    getBook,
    stateSubmit,
  } = useBook()

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
            <BookForm
              formik={formik}
              submit={bookSubmit}
              stateSubmit={stateSubmit}
            />
            <div className="p-6 bg-white border-b border-gray-200 grid lg:grid-cols-3 md:grid-cols-2 gap-4">
              {bookError && <div>{bookError}</div>}
              {bookLoading ? (
                <div>Loading</div>
              ) : (
                books.map(book => (
                  <div key={book.id}>
                    <BookList
                      book={book}
                      getBook={getBook}
                      handleDeleteBook={handleDeleteBook}
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
