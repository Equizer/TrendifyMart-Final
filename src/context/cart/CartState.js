import React, { useContext, useState } from 'react'
import CartContext from './CartContext'
import AlertContext from '../../context/alert/AlertContext'
import AlertButtonContext from '../../context/alert/AlertButtonContext'

const CartState = (props) => {
  const alertContext = useContext(AlertContext);
  const { displayAlert } = alertContext;
  const alertButtonContext = useContext(AlertButtonContext);
  const { displayAlertButton } = alertButtonContext;
  const [cartItems, setCartItems] = useState([]);
  const [deletedProduct, setDeletedProduct] = useState(null);

  const port = 'https://trendifymart-backend.onrender.com';

  // FETCH CART ITEMS

  const fetchCartItems = async () => {
    props.setProgress(15);
    const response = await fetch(`${port}/api/cartitems/fetchcartitems`, {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem('token')
      }
    });
    props.setProgress(45);
    const json = await response.json();
    props.setProgress(75);
    if (json.success) {
      setCartItems(json.allProducts)
    }
    props.setProgress(100);


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
      displayAlertButton('info', "You've deleted the item from the cart");
      setDeletedProduct(json.product);
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
  }


  return (
    <CartContext.Provider value={{ cartItems, setCartItems, fetchCartItems, addToCart, deleteFromCart, editQuantity, deletedProduct, setDeletedProduct }}>
      {props.children}
    </CartContext.Provider>
  )
}



export default CartState
