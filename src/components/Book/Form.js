import axios from '@/lib/axios'
import { useState } from 'react'
import Button from '../Button/Index'
import Input from '../Form/Input'

export default function Form({handleAddBook}) {
  const initialValue = {
    name: '',
    description: '',
    price: 0,
  }
  const [form, setForm] = useState(initialValue)
  const [error, setError] = useState(null)
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  function handleChangeInput(e) {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  async function handleForm(e) {
    e.preventDefault();
    
    try {
      const response = await axios.post(`${baseUrl}/api/books`, form);
      setForm(initialValue)
      handleAddBook({
        book: response.data.data
      })
    } catch (error) {
      setError(error.message);
    }
  }
  return (
    <div className="px-4 py-16 mx-auto max-w-screen-xl sm:px-6 lg:px-8">
      <form onSubmit={handleForm} className="max-w-md mx-auto mt-8 mb-0 space-y-4">
        <Input>
          <Input.label>name</Input.label>
          <Input.form
            type="text"
            placeholder="Enter Name"
            name="name"
            value={form.name}
            onChange={handleChangeInput} />
        </Input>

        <Input>
          <Input.label>price</Input.label>
          <Input.form 
            type="number" 
            placeholder="Enter Price" 
            name="price" 
            value={form.price} 
            onChange={handleChangeInput} />
        </Input>

        <Input>
          <Input.label>description</Input.label>
          <Input.form 
            type="text" 
            placeholder="Enter Description" 
            name="description" 
            value={form.description} 
            onChange={handleChangeInput} />
        </Input>

        <div className="flex items-center justify-end">
          <Button type="submit" className="bg-blue-500 text-white">Submit</Button>
        </div>
      </form>

      {/* <pre>{JSON.stringify(form, null, 2)}</pre> */}
    </div>

  )
}
