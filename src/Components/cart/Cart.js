import React from 'react'
import CartHeader from './CartHeader'
import CartItem from './CartItem'
import OrderSummary from './OrderSummary'

const Cart = () => {
  return (
    <>
      <CartHeader />
      <div className='container cart-component ml-5 bg-cart-image mt-4'>
        <div className='d-flex justify-content-space-between'>
          <div>
        <h2 className='container py-3 fw-bold pt-4'>Items:</h2>
            <CartItem />
          </div>
          <div>
            <OrderSummary />
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart