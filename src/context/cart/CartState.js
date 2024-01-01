import React, { useState } from 'react'
import CartContext from './CartContext'

const CartState = (props) => {
  const [cartItems, setCartItems] = useState([]);

  const port = 'http://localHost:5000';

  const fetchCartItems = async () => {
    const response = await fetch(`${port}/api/cartitems/fetchcartitems`, {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json();
    setCartItems(json.allProducts)
    console.log(json);
  }
  return (
    <CartContext.Provider value={{ cartItems, setCartItems, fetchCartItems }}>
      {props.children}
    </CartContext.Provider>
  )
}

export default CartState
