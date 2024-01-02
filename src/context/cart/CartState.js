import React, { useContext, useState } from 'react'
import CartContext from './CartContext'
import AlertContext from '../../context/alert/AlertContext'

const CartState = (props) => {
  const alertContext = useContext(AlertContext);
  const { displayAlert } = alertContext;
  const [cartItems, setCartItems] = useState([]);

  const port = 'http://localHost:5000';

  // FETCH CART ITEMS

  const fetchCartItems = async () => {
    const response = await fetch(`${port}/api/cartitems/fetchcartitems`, {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json();
    if (json.success) {
      setCartItems(json.allProducts)
      console.log(json);
    }

  }

  // ADD A PRODUCT TO CART 

  const addToCart = async (productId) => {
    const response = await fetch(`${port}/api/cartitems/addtocart/${productId}`, {
      method: 'POST',
      headers: {
        'auth-token': localStorage.getItem('token')
      }
    });
    const json = await response.json();
    if (json.success) {
      setCartItems(cartItems.concat(json.product));
      displayAlert('success', 'Product added to Cart');
      console.log(json);
    }

  }

  // DELETE A PRODUCT FROM CART

  const deleteFromCart = async (productId) => {
    const response = await fetch(`${port}/api/cartitems/deletefromcart/${productId}`, {
      method: 'DELETE',
      headers: {
        'auth-token': localStorage.getItem('token'),
      }
    });
    const json = await response.json();
    if (json.success) {
      displayAlert('warning', 'Product Removed from Cart')
    }
  }


  return (
    <CartContext.Provider value={{ cartItems, setCartItems, fetchCartItems, addToCart, deleteFromCart }}>
      {props.children}
    </CartContext.Provider>
  )
}



export default CartState
