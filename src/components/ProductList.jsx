import axios from 'axios'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import formatProductPrice from '../utils/formatProductPrice'
import LoadingSpinner from './LoadingSpinner'

export default function ProductList() {
  // const [products, setProducts] = React.useState([])
  // React.useEffect(() => {
  //   axios.get('/api/products').then((res) => {
  //     console.log(res.data.products)
  //     setProducts(res.data.products)
  //   })
  // }, [])

  const {
    data: products,
    isLoading,
    error,
  } = useQuery(['Products'], () =>
    axios.get('/api/products').then((res) => res.data.products)
  )

  if (isLoading) return <LoadingSpinner />
  if (error) return '<p> Error....</P>'

  return products.map((product) => (
    <ProductItem product={product} key={product.id} />
  ))
}

function ProductItem({ product }) {
  return (
    <div className='p-4 md:w-1/3'>
      <div className='h-full border-2 border-gray-800 rounded-lg overflow-hidden'>
        <img
          className='lg:h-96 md:h-36 w-full object-cover object-center'
          src={product.image}
          alt=''
        />
        <div className='p-6'>
          <h2 className='tracking-widest text-xs title-font font-medium text-gray-500 mb-1'>
            {product.category}
          </h2>
          <h1 className='title-font text-lg font-medium text-white mb-3'>
            {product.name}
          </h1>
          <p className='leading-relaxed mb-3'>{product.description}</p>
          <div className='flex items-center flex-wrap '>
            <Link to={`/${product.id}`}>
              <span className='text-indigo-400 inline-flex items-center md:mb-2 lg:mb-0'>
                See More
                <svg
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  className='w-4 h-4 ml-2'
                  viewBox='0 0 24 24'
                >
                  <path d='M5 12h14M12 5l7 7-7 7'></path>
                </svg>
              </span>
            </Link>
            <span className='text-gray-500 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-lg pr-3 py-1 border-gray-800 font-bold'>
              {formatProductPrice(product)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
