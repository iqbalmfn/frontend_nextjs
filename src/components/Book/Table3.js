import LoadingOverlay from '@/components/LoadingOverlay/Index';
import Pagination from '@/components/Pagination/Index';
import Table from '@/components/Table/Index';
import baseUrl from '@/lib/baseUrl';
import { cutString } from '@/lib/helpers'
import Image from 'next/image';
import { DebounceInput } from "react-debounce-input"
import { NumericFormat } from 'react-number-format';
import useBook from './BookHook3';

export default function BookTable3({
  books,
  booksMeta,
  getBook,
  handleDeleteBook,
  perPage,
  setPerPage,
  setUrlPage,
  refreshTable,
  searchBook,
  setSearchBook,
  bookLoading,
  categoryBook, 
  setCategoryBook
}) {
  const { categories } = useBook()

  return (
    <>
      <div className='grid grid-cols-2 mb-5'>
        <div className='flex items-center gap-3'>
          show
          <select
            onChange={
              (e) => {
                setPerPage(e.target.value)
                setUrlPage('http://localhost:8000/api/books?page=1')
              }
            }
            value={perPage}
            className='text-sm border border-gray-300 rounded-lg'
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          item from {booksMeta.total}
        </div>
        <div className='flex justify-end items-center gap-3'>
          <button
            onClick={refreshTable}
            className='border w-10 h-10 border-green-500 text-green-500 flex justify-center items-center rounded-lg hover:bg-green-500 hover:text-white transition duration-200'
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>

          </button>
          <select
            onChange={
              (e) => {
                setCategoryBook(e.target.value)
                setUrlPage('http://localhost:8000/api/books?page=1')
              }
            }
            value={categoryBook}
            className='text-sm py-2.5 border border-gray-300 rounded-lg'
          >
            <option value="">Semua Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
          <DebounceInput
            type="search"
            placeholder="Search..."
            className="w-1/2 rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            debounceTimeout={300}
            value={searchBook}
            onChange={(e) => {
              setSearchBook(e.target.value)
              setUrlPage('http://localhost:8000/api/books?page=1')
            }}
          />
        </div>
      </div>
      <Table.wrap>
        {bookLoading && <LoadingOverlay label="Memuat..." />}
        <Table>
          <Table.thead>
            <Table.tr className='bg-gray-50'>
              <Table.th>Name</Table.th>
              <Table.th>Category</Table.th>
              <Table.th>Price</Table.th>
              <Table.th>Description</Table.th>
              <Table.th>Image</Table.th>
              <Table.th className="justify-end">Option</Table.th>
            </Table.tr>
          </Table.thead>
          <tbody>
            {books.length > 0 ? (
              books.map((book, i) => (
                <Table.tr key={book.id}>
                  <Table.td>{book.name}</Table.td>
                  <Table.td className="whitespace-nowrap">
                    <span className='border border-green-500 text-green-500 rounded-lg text-sm px-2 py-1'>
                      {book.category.name}
                    </span>
                  </Table.td>
                  <Table.td className="whitespace-nowrap">
                    <NumericFormat 
                      displayType='text'
                      value={book.price}
                      thousandSeparator="."
                      decimalSeparator=','
                      prefix='Rp. '
                    />
                  </Table.td>
                  <Table.td>{cutString(book.description, 100)}</Table.td>
                  <Table.td>
                    <div className="relative w-28 h-20">
                      <Image
                        className='rounded-lg'
                        layout='fill'
                        alt={book.name}
                        src={book.image ? `${baseUrl}/images/${book.image}` : '/images/no-image.jpg'}
                        objectFit='cover'
                      />
                    </div>
                  </Table.td>
                  <Table.td className="text-end">
                    <div className='flex items-center gap-1'>
                      <button
                        onClick={getBook.bind(this, book.id)}
                        className='border w-8 h-8 border-blue-500 text-blue-500 flex justify-center items-center rounded-lg hover:bg-blue-500 hover:text-white transition duration-200'
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                      </button>
                      <button
                        onClick={handleDeleteBook.bind(this, book.id)}
                        className='border w-8 h-8 border-red-500 text-red-500 flex justify-center items-center rounded-lg hover:bg-red-500 hover:text-white transition duration-200'
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                      </button>
                    </div>
                  </Table.td>
                </Table.tr>
              ))
            ) : (
              <Table.tr>
                <Table.td colSpan={6} className="text-center py-5">
                  {!bookLoading && 'Tidak ada data ditemukan.'}
                </Table.td>
              </Table.tr>
            )}
          </tbody>
        </Table>
      </Table.wrap>
      <div className='mt-5'>
        <div className='flex justify-between'>
          <div className='flex'>

          </div>
          <Pagination>
            {booksMeta.links && booksMeta.links.map((link, i) => (
              <Pagination.nav
                active={booksMeta.current_page == link.label}
                disabled={(i === 0 && booksMeta.current_page === 1) || (i === booksMeta.links.length - 1 && booksMeta.current_page === booksMeta.last_page)}
                key={i}
                onClick={() => {
                  setUrlPage(link.url)
                }}
              >
                {link.label}
              </Pagination.nav>
            ))}
          </Pagination>
        </div>
      </div>
    </>
  )
}
