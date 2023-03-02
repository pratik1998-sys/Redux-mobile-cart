import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CartContainer from './components/CartContainer'
import Modal from './components/modal'
import { Navbar } from './components/Navbar'
import { calculateTotal, fetchCartItems } from './features/cartSlice'

function App() {
  const { cartItems, isLoading } = useSelector((state) => state.cart)
  const { isOpen } = useSelector((state) => state.modal)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCartItems())
  }, [])

  useEffect(() => {
    dispatch(calculateTotal())
  }, [cartItems])

  if (isLoading) {
    return (
      <div className='loading'>
        <h1>Loading.....</h1>
      </div>
    )
  }

  return (
    <main>
      {isOpen && <Modal />}
      <Navbar />
      <CartContainer />
    </main>
  )
}
export default App
