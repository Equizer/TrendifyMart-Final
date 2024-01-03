import React, { useContext, useEffect } from 'react'
import CartHeader from './CartHeader'
import Cart from './Cart'
import OrderSummary from './OrderSummary'
import CartContext from '../../context/cart/CartContext'


const CartComponent = () => {
  const cartContext = useContext(CartContext);
  const { fetchCartItems } = cartContext;
  useEffect( () => {
    fetchCartItems();
  }, []);
  return (
    <>
      <CartHeader />
      <div className='container cart-component ml-5 bg-cart-image mt-4'>
        <div className='d-flex justify-content-between'>
          <Cart />
          <div>
            <OrderSummary />
          </div>
        </div>
      </div>
    </>
  )
}

export default CartComponent