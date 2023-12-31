import React from 'react'
import CartContext from './CartContext'

const CartState = (props) => {
  const [cartItem, setCartItem] = useState([]);
  const fetchCartItems = async () => {
    const response = await fetch();
  }
  return (
    <CartContext.Provider value={{cartItem, setCartItem}}>
      {props.children}
    </CartContext.Provider>
  )
}

export default CartState
