import React from 'react'

const OrderSummary = () => {
  return (
    // add the following css properties in the style obj if we want border on the checkout:
    // , border: '1px solid rgba(0, 0, 0, 0.125)', borderRadius: '4px', 

    // if we want a light green bg for checkout we can change it to backgroundColor: '#d8f3dc' 
    <div className='pb-3 pt-4 border-top-radius-25' style={{ width: '500px', backgroundColor: '#ffffff' }}>
      <h2 className='text-center mb-3 pt-1 fw-bold'>Order Summary</h2>

      <div className="container">

        <h4>Promotions</h4>

        <div className='d-flex justify-content-between my-3'>
          <div>Free Shipping on orders $39+</div>
          <div className='text-success'>-$19.87</div>
        </div>
        <hr />

        <div className='d-flex justify-content-between my-3'>
          <div className='fw-bold'>Subtotal</div>
          <div className='fw-bold'>$115.90</div>
        </div>

        <div className='d-flex justify-content-between my-3'>
          <div>Shipping Cost</div>
          <div className=''>-$19.87</div>
        </div>

        <div className='d-flex justify-content-between my-3'>
          <div className='text-danger'>Shipping Discout</div>
          <div className='text-danger'>-$19.87</div>
        </div>

        <div className='d-flex justify-content-between my-3'>
          <div>Estimated Sales Tax</div>
          <div className=''>$5.43</div>
        </div>

        <div className='d-flex justify-content-between my-3'>
          <div className='fw-bold'>Estimated Total</div>
          <div className='fw-bold'>$121.33</div>
        </div>

        <button className='btn btn-warning container-fluid'>Checkout</button>

      </div>
    </div>
  )
}

export default OrderSummary
