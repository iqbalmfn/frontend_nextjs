import axios from '@/lib/axios'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import baseUrl from '@/lib/baseUrl'
import { useFormik } from 'formik'
import { bookSchema } from '@/components/Book/BookSchema'
import swal from 'sweetalert'
import { useMutation, useQuery, useQueryClient } from 'react-query'
// import { useForm } from "react-hook-form"

function useBook() {
  const [body, setBody] = useState(null)
  const [page, setPage] = useState(1)
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
    image: null,
  })
  const [success, setSuccess] = useState(false)

  const queryClient = useQueryClient();

  // handle form
  const formik = useFormik({
    initialValues: {
      category_id: '',
      name: '',
      description: '',
      price: 0,
    },
    validationSchema: bookSchema,
    onSubmit: async values => {
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

  // query string fetch
  async function getBooks(urlPage, perPage, searchBook, categoryBook) {
    try {
      const response = await axios.get(urlPage, {
        params: {
          perPage: perPage,
          search: searchBook,
          category: categoryBook,
        },
      })
      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  const { data, isError, isLoading, isFetching, isSuccess } = useQuery(
    ['books', urlPage, perPage, searchBook, categoryBook],
    () => getBooks(urlPage, perPage, searchBook, categoryBook),
  )

  const mutation = useMutation(stateSubmit, {
    onMutate: async (newData) => {
      await queryClient.invalidateQueries('books')
      const previousData = queryClient.getQueriesData('books')
      if (previousData) {
        newData = {...newData}
        const finalData = [...previousData, newData]
        queryClient.setQueryData('books', finalData);
      }

      return {previousData}
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries('books')
    },
    onError: async () => {
      console.log('on error');
    },
    onSettled: async (data, error) => {
      if (data) {
        await queryClient.invalidateQueries('books')
        // setSuccess(false)
        console.log('settled');
      } else {
        console.log('error');
      }
    }
  })
  
  async function onSubmit(data) {
    console.log(data);
    await mutation.mutate(data)
  }

  // const { formState: { errors }, register, handleSubmit, reset, clearErrors } = useForm()


  async function getCategories() {
    const response = await axios.get(`${baseUrl}/api/categories`)
    setCategories(response.data.data)
  }

  // mangambil data books
  // async function fetchBook() {
  //   try {
  //     setLoading(true)
  //     const response = await axios.get(urlPage, {
  //       params: {
  //         perPage: perPage,
  //         search: searchBook,
  //         category: categoryBook,
  //       },
  //     })
  //     setBooks(response.data.data.data)
  //     setBooksMeta(response.data.data)
  //     setRefresh(false)
  //   } catch (error) {
  //     setError(error.message)
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  function refreshTable() {
    setRefresh(true)
    setUrlPage('http://localhost:8000/api/books?page=1')
  }

  useEffect(() => {
    getCategories()
    // fetchBook()
  }, [])

  // handle update
  async function handleUpdateBooks(values) {
    try {
      const response = await axios.put(
        `${baseUrl}/api/books/${values.id}`,
        values,
      )
      const book = response.data.data
      const updatedBook = books.map(item => (item.id === book.id ? book : item))
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
        stateSubmit()
        console.log(submit);
        setBooks(filteredBooks)
        formik.resetForm()
        // stateSubmit()
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

  function handleSuccess(value) {
    setSuccess(value);
    // return value
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
      handleSuccess(true)
      // const book = response.data.data
      // setBooks(prev => [book, ...prev])
      formik.resetForm()
      setImage(null)
      stateSubmit(false)
      setMessage({ image: '' })
      toast.success('sukses bro', {
        theme: 'colored',
      })
    } catch (error) {
      toast.error(error.response.data.data.image[0], {
        theme: 'colored',
      })
      setMessage({ image: error.response.data.data.image[0] })
    }
  }

  // console.log(handleAddBook);

  function stateSubmit(value) {
    setSubmit(value)
  }

  return {
    data,
    page,
    setPage,
    isLoading,
    isFetching,
    isSuccess,
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
    setCategoryBook,
    onSubmit,
    // handleSubmit, errors, register, reset, clearErrors
  }
}

export default useBook
