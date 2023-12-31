import React from 'react'

const CartItem = () => {
    return (

        <div className='container fw-bold bg' style={{ backgroundColor: '#ffffff' }}>
            <div className="card mb-3" style={{ maxWidth: "600px" }}>
                <div className="d-flex justify-content-between align-items-center">
                    <div className="col-md-3">
                        <img src={require('../../images/products/men-golf-polo-t-shirt-red.jpg')} className="img-fluid rounded-start py-2 pl-2" alt="..." />
                    </div>
                    <div className=''>Polo T-shirt</div>
                    <div className='d-flex align-items-center'>
                        <button className='btn btn-light'>-</button>
                        <div className='mx-3'>2</div>
                        <button className='btn btn-light'>+</button>
                    </div>
                    <div className=''>$7.99</div>
                    <button className='btn btn-light  mx-3'><i className="fa-solid fa-trash"></i></button>
                </div>
            </div>
        </div>




    )
}

export default CartItem
