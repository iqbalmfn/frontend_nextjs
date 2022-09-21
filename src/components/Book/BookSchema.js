import * as yup from 'yup'

// validation
export const bookSchema = yup.object().shape({
    category_id: yup
      .number()
      .required('Category is required'),
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