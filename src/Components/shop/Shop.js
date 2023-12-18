import React from 'react'

const Shop = () => {
  return (
    <div className='container d-flex justify-content-between margin-top-88 py-3' style={{ height: '300px', backgroundColor: '#ced4da' }}>
      <div className='container mx-0 col-3 rounded-1' style={{ backgroundColor: 'white' }}>
        <h3 className=''>Orders</h3>
        <p className='d-flex justify-content-between'>
          <span>Pending</span>
          <span>13</span>
        </p>
        <p className='d-flex justify-content-between'>
          <span>Premium Unshipped</span>
          <span>4</span>
        </p>
        <p className='d-flex justify-content-between'>
          <span>Shipped</span>
          <span>29</span>
        </p>
        <p className='d-flex justify-content-between'>
          <span>Return Request</span>
          <span>3</span>
        </p>
      </div>


      <div className='container mx-2 col-6 rounded-1' style={{ backgroundColor: 'white' }}>
        <h3 className=''>Getting Started</h3>
        <div className='container-fluid bg-secondary'>List a Product</div>
      </div>
      <div className='container mx-0 custom-width-23 rounded-1' style={{ backgroundColor: 'white' }}> {/* the reason we gave custom width to this element and bootstrap classes for other is to make the grid more precise as the grid system for boostrap has 12 columns we gave col-6 to center element and first element col-3 now we wanted somewhere between col-2 and col-3 as giving col-2 would make it too small and giving it col-3 would end up covering the entire width and some margins between and on the borders would not remain  */} 
        <h3 className=''>Sales Summary</h3>
      </div>
    </div>
  )
}

export default Shop


// the design should be the three at the top orders add a product sales summary and then below that component should be the sellers product for sale