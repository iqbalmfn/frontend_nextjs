import axios from '@/lib/axios'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import baseUrl from '@/lib/baseUrl'
import { useFormik } from 'formik'
import { bookSchema } from '@/components/Book/BookSchema'
import swal from 'sweetalert'

function useBook3() {
  const [perPage, setPerPage] = useState(10)
  const [urlPage, setUrlPage] = useState(`${baseUrl}/api/books?page=1`)
  const [searchBook, setSearchBook] = useState('')
  const [categoryBook, setCategoryBook] = useState('')
  const [books, setBooks] = useState([])
  const [booksMeta, setBooksMeta] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [submit, setSubmit] = useState(false)
  const [categories, setCategories] = useState([])
  const [image, setImage] = useState(null)
  const [message, setMessage] = useState({
    image: null
  })


  async function getCategories() {
    const response = await axios.get(`${baseUrl}/api/categories`)
    setCategories(response.data.data)
  }

  // mangambil data books
  async function fetchBook() {
    try {
      setLoading(true)
      const response = await axios.get(urlPage, {
        params: {
          perPage: perPage,
          search: searchBook,
          category: categoryBook,
        }
      })
      setBooks(response.data.data.data)
      setBooksMeta(response.data.data)
      setRefresh(false)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  function refreshTable() {
    setRefresh(true)
    setUrlPage('http://localhost:8000/api/books?page=1')
  }

  useEffect(() => {
    getCategories()
    fetchBook()
  }, [urlPage, perPage, searchBook, refresh, categoryBook])
  // handle form
  const formik = useFormik({
    initialValues: {
      category_id: '',
      name: '',
      description: '',
      price: 0,
    },
    validationSchema: bookSchema,
    onSubmit: async (values) => {
      try {
        if (values.id) {
          handleUpdateBooks(values)
        } else {
          handleAddBook(values)
        }
      } catch (error) {
        console.log(error)
      }
    },
  })

  // handle update
  async function handleUpdateBooks(values) {
    try {
      const response = await axios.put(
        `${baseUrl}/api/books/${values.id}`,
        values,
      )
      const book = response.data.data
      const updatedBook = books.map(item => (item.id === book.id ? book : item))
      formik.resetForm();
      setBooks(updatedBook)
      stateSubmit(false)
      toast.success('sukses bro', {
        theme: 'colored',
      })
    } catch (error) {
      toast.error('error bro', {
        theme: 'colored',
      })
    }
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
    try {
      const formData = new FormData()
      Object.keys(values).forEach(key => {
        formData.append(key, values[key])
      })

      if (image) {
        formData.append('image', image)
      }

      const response = await axios.post(`${baseUrl}/api/books`, formData, {
        headers: {
          'Content-Type': `multipart/form-data; charset=utf-8; boundary=${Math.random()
            .toString()
            .substr(2)}`,
        },
      })
      const book = response.data.data
      setBooks(prev => [book, ...prev])
      formik.resetForm();
      setImage(null)
      stateSubmit(false)
      toast.success('sukses bro', {
        theme: 'colored',
      })
      setMessage({ image: '' })
    } catch (error) {
      toast.error(error.response.data.data.image[0], {
        theme: 'colored',
      })
      setMessage({ image: error.response.data.data.image[0] })
    }
  }

  function stateSubmit(value) {
    setSubmit(value)
  }

  return {
    categories,
    books,
    booksMeta,
    searchBook,
    setSearchBook,
    urlPage,
    setUrlPage,
    perPage,
    setPerPage,
    formik,
    bookLoading: loading,
    bookError: error,
    bookSubmit: submit,
    handleDeleteBook,
    getBook,
    stateSubmit,
    image,
    setImage,
    message,
    refreshTable,
    categoryBook,
    setCategoryBook
  }
}

export default useBook3
