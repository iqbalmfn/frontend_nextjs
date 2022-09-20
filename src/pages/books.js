import BookForm from '@/components/Book/Form'
import BookList from '@/components/Book/List'
import AppLayout from '@/components/Layouts/AppLayout'
import axios from '@/lib/axios'
import baseUrl from '@/lib/baseUrl'
import { useFormik } from 'formik'
import * as yup from 'yup'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import swal from 'sweetalert'

export default function Book() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [submit, setSubmit] = useState(false)
  const [swalProps, setSwalProps] = useState({});

  // validation
  const bookSchema = yup.object().shape({
    name: yup
      .string()
      .min(4, 'Minimal 4 characters!')
      .max(254, 'Maximal 254 characters!')
      .required('Name is required'),
    description: yup
      .string()
      .min(10, 'Minimal 10 characters!')
      .required('Description is required'),
    price: yup
      .number('Price must be number')
      .min(1000, 'Minimal price 1000.')
      .required('Price is required'),
  })

  // handle update
  function handleUpdateBooks({ book }) {
    const updatedBook = books.map(item => item.id === book.id ? book : item);
    setBooks(updatedBook)
  }

  // handle form
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      price: 0,
    },
    validationSchema: bookSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        if (values.id) {
          const response = await axios.put(`${baseUrl}/api/books/${values.id}`, values)
          handleUpdateBooks({ book: response.data.data });
          resetForm();
          setSubmit(false);
          swal("Data berhasil diupdate", {
            icon: "success",
          });
        } else {
          const response = await axios.post(`${baseUrl}/api/books`, values)
          handleAddBook({
            book: response.data.data,
          })
          resetForm();
          setSubmit(false);
          swal("Data berhasil ditambahkan", {
            icon: "success",
          });
        }
      } catch (error) {
        console.log(error)
      }
    },
  })

  //handle delete
  function handleDeleteBook(id, name) {
    swal({
      title: "Are you sure?",
      text: `Apakah kamu akan menghapus data ini?`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then( async (willDelete) => {
      if (willDelete) {
        await axios.delete(`${baseUrl}/api/books/${id}`)
        const filteredBooks = books.filter(item => item.id !== id)
        setBooks(filteredBooks)
        formik.resetForm()
        
      }
    });
  }

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

  async function getBook(id) {
    try {
      const response = await axios.get(`${baseUrl}/api/books/${id}`)

      const book = response.data.data

      formik.setFieldValue("name", book.name)
      formik.setFieldValue("description", book.description)
      formik.setFieldValue("price", book.price)
      formik.setFieldValue("id", book.id)
    } catch (error) {
      setError(error.message)
    }
  }

  useEffect(() => {
    fetchBook()
  }, [])

  function handleAddBook({ book }) {
    setBooks(prev => [book, ...prev])
  }

  function stateSubmit() {
    setSubmit(true);
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
            <BookForm
              formik={formik}
              submit={submit}
              stateSubmit={stateSubmit}
            />
            <div className="p-6 bg-white border-b border-gray-200 grid lg:grid-cols-3 md:grid-cols-2 gap-4">
              {error && <div>{error}</div>}
              {loading ? (
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
