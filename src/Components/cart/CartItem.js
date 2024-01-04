import React, { useContext } from 'react'
import CartContext from '../../context/cart/CartContext'

const CartItem = (props) => {
    const cartContext = useContext(CartContext);
    const { deleteFromCart, fetchCartItems, editQuantity } = cartContext;
    const handleDeleteButton = async () => {
        await deleteFromCart(props.cartItemId);
        fetchCartItems();
    }

    const handleIncreaseQuantity = async (e) => {
        e.preventDefault();
        await editQuantity(props.cartItemId, props.quantity + 1);
        fetchCartItems();
    }

    const handleDecreaseQuantity = async (e) => {
        //  acording to the following code we must only decrease the quantity if the quantity is 2 or more already if it is 1 and user tries to delete it then it should actually delete the item
        if (props.quantity > 1) {
        e.preventDefault();
        await editQuantity(props.cartItemId, props.quantity - 1);
        fetchCartItems();            
        }
        // in the below condition we cannot say when props.quantity === 0 we should delete the item becuz when the quantity is 1 and user clicks on decrease button it should delete the product
        else if(props.quantity === 1) {
            handleDeleteButton();
        }

    }
    return (

        <div className='container fw-bold bg' style={{ backgroundColor: '#ffffff' }}>
            <div className="card mb-3" style={{ maxWidth: "600px" }}>
                <div className="d-flex justify-content-between align-items-center">
                    <div className="col-md-3">
                        <img src={props.imageUrl} className="img-fluid rounded-start pl-2" alt="..." />
                    </div>
                    <div className=''>{props.name}</div>
                    <div className='d-flex align-items-center'>
                        <button className='btn btn-light' onClick={handleDecreaseQuantity}>-</button>
                        <div className='mx-3'>{props.quantity}</div>
                        <button className='btn btn-light' onClick={handleIncreaseQuantity}>+</button>
                    </div>
                    <div className=''>${props.priceCents / 100}</div>
                    <button className='btn btn-light  mx-3' onClick={handleDeleteButton}><i className="fa-solid fa-trash"></i></button>
                </div>
            </div>
        </div>




    )
}

export default CartItem
