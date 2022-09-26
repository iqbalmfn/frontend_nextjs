import Button from '@/components/Button/Index'
import Input from '@/components/Form/Input'
import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { useForm } from 'react-hook-form'

export default function Newbooks() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const onSubmit = data => console.log(data)
  
  return (
    <AppLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          New Books
        </h2>
      }>
      <Head>
        <title>Laravel - New Books</title>
      </Head>

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <form 
                className="space-y-4 p-5"
                onSubmit={handleSubmit(onSubmit)}
            >
              <Input>
                <Input.label>Name</Input.label>
                <Input.form
                  type="text"
                  placeholder="Masukkan Nama"
                  name="name"
                  register={register}
                />
              </Input>
              <Input>
                <Input.label>Price</Input.label>
                <Input.form
                  type="text"
                  placeholder="Masukkan Price"
                  name="price"
                  register={register}
                />
              </Input>
              <Input>
                <Input.label>Description</Input.label>
                <Input.form
                  type="text"
                  placeholder="Masukkan Description"
                  name="description"
                  register={register}
                />
              </Input>
              <div className="flex items-center justify-end">
                <Button type="submit" className="bg-blue-500 text-white">
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
