import React from 'react'

const Shop = () => {
  return (
    <div className='container d-flex bg-light justify-content-between margin-top-88' style={{ height: '300px' }}>
      <div className='container-fluid' style={{ backgroundColor: 'white' }}>
        <h2 className='text-center'>Orders</h2>
        <p className='d-flex justify-content-between'>
          <span>Pending</span>
          <span>0</span>
        </p>
        <p className='d-flex justify-content-between'>
          <span>Premium Unshipped</span>
          <span>0</span>
        </p>
        <p className='d-flex justify-content-between'>
          <span>Shipped</span>
          <span>0</span>
        </p>
        <p className='d-flex justify-content-between'>
          <span>Return Request</span>
          <span>0</span>
        </p>
      </div>


      <div className='container-fluid' style={{ backgroundColor: 'white' }}>
        <h2 className='text-center'>Add a product</h2>
      </div>
      <div className='container-fluid' style={{ backgroundColor: 'white' }}>
        <h2 className='text-center'>Sales Summary</h2>
      </div>
    </div>
  )
}

export default Shop


// the design should be the three at the top orders add a product sales summary and then below that component should be the sellers product for sale