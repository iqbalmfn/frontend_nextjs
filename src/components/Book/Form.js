import axios from '@/lib/axios'
import clsx from 'clsx'
import { useFormik } from 'formik'
import { useState } from 'react'
import * as yup from 'yup'
import Button from '../Button/Index'
import Input from '../Form/Input'

export default function Form({ handleAddBook }) {
  const [submit, setSubmit] = useState(false)
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL

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

  // handle form
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      price: 0,
    },
    validationSchema: bookSchema,
    onSubmit: (values, {resetForm}) => {
      handleSubmit(values, resetForm)
    },
  })

  // method handle form
  async function handleSubmit(values, resetForm) {
    try {
      const response = await axios.post(`${baseUrl}/api/books`, values)
      handleAddBook({
        book: response.data.data,
      })
      resetForm();
      setSubmit(false);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="px-4 py-16 mx-auto max-w-screen-xl sm:px-6 lg:px-8">
      <form
        onSubmit={formik.handleSubmit}
        className="max-w-md mx-auto mt-8 mb-0 space-y-5">
        <Input>
          <Input.label>name</Input.label>
          <Input.form
            type="text"
            placeholder="Enter Name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            className={clsx(formik.errors['name'] && submit ? 'border-red-500' : '')}
          />
          {formik.errors && submit ? (
            <small className="text-red-500">{formik.errors['name']}</small>
          ): ''}
        </Input>

        <Input>
          <Input.label>price</Input.label>
          <Input.form
            type="text"
            placeholder="Enter Price"
            name="price"
            value={formik.values.price}
            onChange={formik.handleChange}
            className={clsx(formik.errors['price'] && submit ? 'border-red-500' : '')}
          />
          {formik.errors && submit ? (
            <small className="text-red-500">{formik.errors['price']}</small>
          ) : ''}
        </Input>

        <Input>
          <Input.label>description</Input.label>
          <Input.form
            type="text"
            placeholder="Enter Description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            className={clsx(formik.errors['description'] && submit ? 'border-red-500' : '')}

          />
          {formik.errors && submit ? (
            <small className="text-red-500">
              {formik.errors['description']}
            </small>
          ): ''}
        </Input>

        <div className="flex items-center justify-end">
          <Button type="submit" className="bg-blue-500 text-white" onClick={() => setSubmit(true)}>
            Submit
          </Button>
        </div>
      </form>
    </div>
  )
}
