import axios from 'axios'
import toast from 'react-hot-toast'
import { useShoppingCart } from 'use-shopping-cart'

// client (product details) - own server - stripe - session id -redirect to checkout - after payment (stripe) - success url
export default function useCheckout() {
  const { redirectToCheckout, cartDetails } = useShoppingCart()
  const handleCheckout = async () => {
    try {
      const res = await axios.post('/api/checkout-session', cartDetails)
      const session = res.data
      console.log(session.id)
      if (session) {
        redirectToCheckout(session.id)
      }
    } catch (err) {
      toast.error('checkout failed')
      console.log('Error during checkout', err.message)
    }
  }
  return handleCheckout
}
