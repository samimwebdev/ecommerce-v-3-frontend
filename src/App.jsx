import { loadStripe } from '@stripe/stripe-js'
import React from 'react'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { CartProvider } from 'use-shopping-cart'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Product from './pages/Product'
import Result from './pages/Result'

const queryClient = new QueryClient()

const stripeKey =
  'pk_test_51KAWu7J55LxScSYfmPyIXKyAgsC9OZq1NJIUnXIV6KhJ1IOn0sTLrUzrLO5tYQBRyi66lwW2srjaC7xVNWlxFyuS00OGf1IdWd'
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider
        mode='payment'
        cartMode='checkout-session'
        stripe={stripeKey}
        currency='USD'
      >
        <BrowserRouter>
          <Navbar />
          <Toaster position='bottom-center' />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/result' element={<Result />} />
            <Route path='/:productId' element={<Product />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </QueryClientProvider>
  )
}

export default App
