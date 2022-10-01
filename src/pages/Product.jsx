// @ts-nocheck
import axios from 'axios'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { useShoppingCart } from 'use-shopping-cart'
import AddToCart from '../components/AddToCart'
import LoadingSpinner from '../components/LoadingSpinner'
import RemoveFromCart from '../components/RemoveFromCart'
import formatProductPrice from '../utils/formatProductPrice'

export default function Product() {
  const { productId } = useParams()

  const {
    data: product,
    isLoading,
    error,
    isError,
  } = useQuery(['Product', productId], () =>
    axios(`/api/products/${productId}`).then((res) => res.data.product)
  )
  if (isLoading) return <LoadingSpinner />
  if (isError)
    return (
      <div className='text-red-500 font-bold text-center mx-auto'>
        {error.message}
      </div>
    )
  return (
    <section className='text-gray-400 bg-gray-900 body-font overflow-hidden'>
      <div className='container px-5 py-24 mx-auto'>
        <div className='lg:w-4/5 mx-auto flex flex-wrap'>
          <img
            alt=''
            className='lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded'
            src={product.image}
          />
          <div className='lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0'>
            <h2 className='text-sm title-font text-gray-500 tracking-widest'>
              {product.category}
            </h2>
            <h1 className='text-white text-3xl title-font font-medium mb-8'>
              {product.name}
            </h1>
            <p className='leading-relaxed'>{product.description}</p>
            <div className='flex mt-6 items-center pb-5 border-b-2 border-gray-800 mb-5'></div>
            <div className='flex'>
              <span className='title-font font-medium text-2xl text-white'>
                {formatProductPrice(product)}
              </span>
              <AddToCart product={product} />
              <RemoveFromCart product={product} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
