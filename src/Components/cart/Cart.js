import React, { useContext, useEffect } from 'react'
import CartHeader from './CartHeader'
import CartItem from './CartItem'
import OrderSummary from './OrderSummary'
import CartContext from '../../context/cart/CartContext'

const Cart = () => {
  const cartContext = useContext(CartContext);
  const { fetchCartItems, cartItems } = cartContext;
  useEffect(() => {
    fetchCartItems();
  }, []);
  return (
    <>
      <CartHeader />
      <div className='container cart-component ml-5 bg-cart-image mt-4'>
        <div className='d-flex justify-content-between'>
          <div>
            <h2 className='container py-3 fw-bold pt-4'>Items:</h2>
            {cartItems.length === 0 ? <div className="mx-2 fw-bold" >No items to display in Cart</div> : cartItems.map((cartItem) => {
              return (
                <CartItem imageUrl={cartItem.imageUrl} name={cartItem.name} description={cartItem.description} rating={cartItem.rating} priceCents={cartItem.priceCents} quantity={cartItem.quantity} keywords={cartItem.keywords} condition={cartItem.condition} inStock={cartItem.inStock} id={cartItem._id} key={cartItem._id} />
              )
            })
            }
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