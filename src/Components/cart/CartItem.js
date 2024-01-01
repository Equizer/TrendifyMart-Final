import React from 'react'

const CartItem = (props) => {
    return (

        <div className='container fw-bold bg' style={{ backgroundColor: '#ffffff' }}>
            <div className="card mb-3" style={{ maxWidth: "600px" }}>
                <div className="d-flex justify-content-between align-items-center">
                    <div className="col-md-3">
                        <img src={props.imageUrl} className="img-fluid rounded-start py-2 pl-2" alt="..." />
                    </div>
                    <div className=''>{props.name}</div>
                    <div className='d-flex align-items-center'>
                        <button className='btn btn-light'>-</button>
                        <div className='mx-3'>{props.quantity}</div>
                        <button className='btn btn-light'>+</button>
                    </div>
                    <div className=''>${props.priceCents / 100}</div>
                    <button className='btn btn-light  mx-3'><i className="fa-solid fa-trash"></i></button>
                </div>
            </div>
        </div>




    )
}

export default CartItem
