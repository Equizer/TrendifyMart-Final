import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import CartItem from './CartItem'
import CartContext from '../../context/cart/CartContext'

const Cart = () => {
  const cartContext = useContext(CartContext);
  const { cartItems } = cartContext;

  return (
    <div>
      <h2 className='container py-3 fw-bold pt-4'>Items:</h2>
      {localStorage.getItem('token') ? cartItems.length === 0 ? <div className="mx-2 fw-bold" >No items to display in Cart</div> : cartItems.map((cartItem) => {
        return (
          <CartItem imageUrl={cartItem.imageUrl} name={cartItem.name} description={cartItem.description} rating={cartItem.rating} priceCents={cartItem.priceCents} quantity={cartItem.quantity} keywords={cartItem.keywords} condition={cartItem.condition} inStock={cartItem.inStock} cartItemId={cartItem._id} key={cartItem._id} />
        )
      }) : <div class="card text-bg-info mb-3" style={{ "max-width": "18rem" }}>
        <div class="card-header">You are not Signed in!</div>
        <div class="card-body">
          <h5 class="card-title">Authentication Required</h5>
          <p class="card-text">Login or Signup to access your Cart.</p>
          <Link className='btn btn-primary' to="/login">Login</Link>
          <Link className='btn btn-primary mx-2' to="/signup">Signup</Link>
        </div>
      </div>}
    </div>
  )
}

export default Cart
