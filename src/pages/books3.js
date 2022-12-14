import useBook from '@/components/Book/BookHook3';
import BookForm from '@/components/Book/Form';
import BookTable from '@/components/Book/Table3';
import AppLayout from '@/components/Layouts/AppLayout';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';

export default function Book3() {
  const {
    formik,
    books,
    booksMeta,
    searchBook,
    setSearchBook,
    setUrlPage,
    perPage,
    setPerPage,
    bookLoading,
    bookSubmit,
    handleDeleteBook,
    getBook,
    stateSubmit,
    image,
    setImage,
    message,
    refreshTable,
    categoryBook,
    setCategoryBook
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
              image={image}
              setImage={setImage}
              message={message}
            />
            <div className="p-6 bg-white">
              <BookTable
                books={books}
                perPage={perPage}
                booksMeta={booksMeta}
                getBook={getBook}
                handleDeleteBook={handleDeleteBook}
                setPerPage={setPerPage}
                setUrlPage={setUrlPage}
                refreshTable={refreshTable}
                searchBook={searchBook}
                setSearchBook={setSearchBook}
                bookLoading={bookLoading}
                categoryBook={categoryBook}
                setCategoryBook={setCategoryBook}
              />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </AppLayout>
  )
}
