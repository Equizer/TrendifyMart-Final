import React, { useContext } from 'react'
import AlertButtonContext from '../context/alert/AlertButtonContext'
import CartContext from '../context/cart/CartContext'

function AlertButton() {
  const alertButtonContext = useContext(AlertButtonContext)
  const { alertButton } = alertButtonContext;
  const cartContext = useContext(CartContext);
  const { deletedProduct, addToCart } = cartContext;

  const undoDeletedProduct = async () => {
    await addToCart(deletedProduct.productId, deletedProduct.quantity);
    console.log('undid');
  }
  return (
    alertButton && <div class={`alert alert-${alertButton.type} alert-component container-fluid`} role="alert">
      {alertButton.message} <button onClick={() => {undoDeletedProduct()}} className='btn btn-info mx-3'>undo</button>
    </div>
  )
}

export default AlertButton
