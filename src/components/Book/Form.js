import clsx from 'clsx'
import Button from '../Button/Index'
import Input from '../Form/Input'
import useBook from './BookHook'

export default function Form({ formik, submit, stateSubmit }) {
  const { categories } = useBook()

  return (
    <div className="px-4 py-16 mx-auto max-w-screen-xl sm:px-6 lg:px-8">
      <form
        onSubmit={formik.handleSubmit}
        className="max-w-md mx-auto mt-8 mb-0 space-y-5">
        <Input>
          <Input.label>category</Input.label>
          <Input.select
            name="category_id"
            value={formik.values.category_id}
            onChange={formik.handleChange}
            className={clsx(
              formik.errors['category_id'] && submit ? 'border-red-500' : '',
            )}>
            {categories.map(category => (
              <Input.option key={category.id} value={category.id}>
                {category.name}
              </Input.option>
            ))}
          </Input.select>
          {formik.errors && submit ? (
            <small className="text-red-500">{formik.errors['catery_id']}</small>
          ) : (
            ''
          )}
        </Input>

        <Input>
          <Input.label>name</Input.label>
          <Input.form
            type="text"
            placeholder="Enter Name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            className={clsx(
              formik.errors['name'] && submit ? 'border-red-500' : '',
            )}
          />
          {formik.errors && submit ? (
            <small className="text-red-500">{formik.errors['name']}</small>
          ) : (
            ''
          )}
        </Input>

        <Input>
          <Input.label>price</Input.label>
          <Input.form
            type="text"
            placeholder="Enter Price"
            name="price"
            value={formik.values.price}
            onChange={formik.handleChange}
            className={clsx(
              formik.errors['price'] && submit ? 'border-red-500' : '',
            )}
          />
          {formik.errors && submit ? (
            <small className="text-red-500">{formik.errors['price']}</small>
          ) : (
            ''
          )}
        </Input>

        <Input>
          <Input.label>description</Input.label>
          <Input.form
            type="text"
            placeholder="Enter Description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            className={clsx(
              formik.errors['description'] && submit ? 'border-red-500' : '',
            )}
          />
          {formik.errors && submit ? (
            <small className="text-red-500">
              {formik.errors['description']}
            </small>
          ) : (
            ''
          )}
        </Input>

        <div className="flex items-center justify-end">
          <Button
            type="submit"
            className="bg-blue-500 text-white"
            onClick={stateSubmit}>
            {formik.values.id ? 'Update' : 'Submit'}
          </Button>
        </div>
      </form>
    </div>
  )
}
