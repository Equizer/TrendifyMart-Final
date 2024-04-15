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

  const addToCart = async (productId, quantityState) => {
    const response = await fetch(`${port}/api/cartitems/addtocart/${productId}`, {
      method: 'POST',
      headers: {
        "Content-type": "application/json",
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ quantity: quantityState })
      
    });
    const json = await response.json();
    if (json.success) {
      setCartItems(cartItems.concat(json.product));
      displayAlert('success', 'Product added to cart');
      console.log(json);
    }
    else {
      displayAlert('warning', 'Product was not added to cart')
    }
  }

  // DELETE A PRODUCT FROM CART

  const deleteFromCart = async (cartItemId) => {
    const response = await fetch(`${port}/api/cartitems/deletefromcart/${cartItemId}`, {
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

  // EDIT ITEM'S QUANTITY IN CART 

  const editQuantity = async (cartItemId, quantity) => {
    const response = await fetch(`${port}/api/cartitems/editquantity/${cartItemId}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ quantity: quantity })
    });
    const json = await response.json();
    console.log(json);
  }


  return (
    <CartContext.Provider value={{ cartItems, setCartItems, fetchCartItems, addToCart, deleteFromCart, editQuantity }}>
      {props.children}
    </CartContext.Provider>
  )
}



export default CartState
