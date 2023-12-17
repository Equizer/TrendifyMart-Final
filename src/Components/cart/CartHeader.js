import React from 'react'

const CartHeader = () => {
    return (
        <h1 className='cart-header body-content container ml-5 text-center' style={{ color: "#0c3479"}}>
            <i className="fa-solid fa-cart-shopping mx-3" style={{ color: "#0c3479" }}></i>
            Your Cart
        </h1>
    )
}

export default CartHeader
