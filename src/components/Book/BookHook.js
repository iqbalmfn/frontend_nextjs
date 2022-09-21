import axios from '@/lib/axios'
import { useEffect, useState } from 'react'
import baseUrl from '@/lib/baseUrl'
import { useFormik } from 'formik'
import { bookSchema } from '@/components/Book/BookSchema'
import swal from 'sweetalert'

function useBook() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [submit, setSubmit] = useState(false)
  const [categories, setCategories] = useState([])
  const [image, setImage] = useState(null)

  async function getCategories() {
    const response = await axios.get(`${baseUrl}/api/categories`)
    setCategories(response.data.data)
  }

  // mangambil data books
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
    getCategories()
    fetchBook()
  }, [])

  // handle form
  const formik = useFormik({
    initialValues: {
      category_id: '',
      name: '',
      description: '',
      price: 0,
    },
    validationSchema: bookSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        if (values.id) {
          handleUpdateBooks(values)
          resetForm()
          stateSubmit(false)
          swal('Data berhasil diupdate', {
            icon: 'success',
          })
        } else {
          handleAddBook(values)
          // resetForm()
          stateSubmit(false)
          swal('Data berhasil ditambahkan', {
            icon: 'success',
          })
        }
      } catch (error) {
        console.log(error)
      }
    },
  })

  // handle update
  async function handleUpdateBooks(values) {
    const response = await axios.put(
      `${baseUrl}/api/books/${values.id}`,
      values,
    )
    const book = response.data.data
    const updatedBook = books.map(item => (item.id === book.id ? book : item))
    setBooks(updatedBook)
  }

  //handle delete
  function handleDeleteBook(id) {
    swal({
      title: 'Are you sure?',
      text: `Apakah kamu akan menghapus data ini?`,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(async willDelete => {
      if (willDelete) {
        await axios.delete(`${baseUrl}/api/books/${id}`)
        const filteredBooks = books.filter(item => item.id !== id)
        setBooks(filteredBooks)
        formik.resetForm()
      }
    })
  }

  // menampilkan data book berdasarkan id
  async function getBook(id) {
    try {
      const response = await axios.get(`${baseUrl}/api/books/${id}`)

      const book = response.data.data

      formik.setFieldValue('name', book.name)
      formik.setFieldValue('category_id', book.category_id)
      formik.setFieldValue('description', book.description)
      formik.setFieldValue('price', book.price)
      formik.setFieldValue('id', book.id)
    } catch (error) {
      setError(error.message)
    }
  }

  async function handleAddBook(values) {
    const formData = new FormData()
    Object.keys(values).forEach(key => {
      formData.append(key, values[key])
    })

    if (image) {
      formData.append('image', image)
    }

    const response = await axios.post(
      `${baseUrl}/api/books`, 
      formData, 
      {
        headers: { "Content-Type": `multipart/form-data; charset=utf-8; boundary=${Math.random().toString().substr(2)}` }
      }
    )
    const book = response.data.data
    setBooks(prev => [book, ...prev])
    setImage(null)
  }

  function stateSubmit(value) {
    setSubmit(value)
  }

  return {
    categories,
    books,
    formik,
    bookLoading: loading,
    bookError: error,
    bookSubmit: submit,
    handleDeleteBook,
    getBook,
    stateSubmit,
    image,
    setImage
  }
}

export default useBook
