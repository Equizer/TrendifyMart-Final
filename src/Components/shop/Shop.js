import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import verifiedLogo from '../../images/checkmark.png'
import ProductContext from '../../context/products/ProductContext'
import AddProduct from './AddProduct'
import SellerProduct from './SellerProduct'

const Shop = () => {
  //  WE CAN PUT A CHECK IN OUR BACKEND TO DETERMINE WHETHER THE USER IS A SELLER OR A CONSUMER WE WILL ADD THAT IN OUR BACKEND USER MODEL WHICH WILL BE A BOOLEAN IF seller IS TRUE THAT MEANS THE USER IS A SELLER OR ELSE THEY ARE A CONSUMER 

  //  WE CAN USE THE MIDDLEWARE FETCHUSER WHICH HAS OUR USER OBJECT FROM THAT WE CAN CHECK FIRST IF THE USER IS SELLER OR NOT THEN IF THEY ARE NOT WE CAN THROW AN ERROR 

  const productContext = useContext(ProductContext);
  const { fetchSellerProducts, sellerProducts } = productContext;

  useEffect(() => {
    fetchSellerProducts();
  }, [])

  const handleClick = () => {

  }
  return (
// JUST STORE THE USER'S seller FIELD IN THE LOCAL STORAGE
<>
      <div className='container d-flex justify-content-between margin-top-88 py-2 px-2' style={{ height: '300px', backgroundColor: '#ced4da' }}>
        <div className='container mx-0 col-3 rounded-1' style={{ backgroundColor: 'white' }}>
          <h3 className='mb-2'>Orders</h3>
          <p className='d-flex justify-content-between fs-5 px-2 mb-2 rounded-1' style={{ backgroundColor: '#E6F0F9', color: '#1079CD' }}>
            <span>Pending</span>
            <span>13</span>
          </p>
          <p className='d-flex justify-content-between fs-5 px-2 mb-2 rounded-1' style={{ backgroundColor: '#E6F0F9', color: '#1079CD' }}>
            <span>Premium Unshipped</span>
            <span>4</span>
          </p>
          <p className='d-flex justify-content-between fs-5 px-2 mb-2 rounded-1' style={{ backgroundColor: '#E6F0F9', color: '#1079CD' }}>
            <span>Shipped</span>
            <span>29</span>
          </p>
          <p className='d-flex justify-content-between fs-5 px-2 mb-2 rounded-1' style={{ backgroundColor: '#E6F0F9', color: '#1079CD' }}>
            <span>Return Request</span>
            <span>3</span>
          </p>
        </div>

        <div className='container  col-6 rounded-1 px-0 mx-2' >

          <div className='d-flex'>

            <div className="px-2 col-8" style={{ backgroundColor: 'white' }}>
              <h3 className='mb-0'>Getting Started</h3>

              <div className='d-flex align-items-center' style={{ height: '100px' }}>

                <button className='btn rounded-circle' style={{ backgroundColor: '#1079CD' }}>
                  <i className="fa-solid fa-plus" style={{ "color": "#ffffff" }}></i>
                </button>

                <div className='container-fluid'>
                  <p className='mb-0 fw-bold font-size-15'>List a Product to sell online</p>
                  <p className='mb-0 font-size-13'>Start Partnership with us!</p>
                </div>

                <button className='btn' type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop" style={{ backgroundColor: "rgb(16, 121, 205)", color: 'white', whiteSpace: 'nowrap' }} onClick={handleClick} >Add a Product</button>
              </div>
              <Link to="/contactus" className='font-size-13'>Tell us your experiences Seller on TrendifyMart</Link>
            </div>

            <div className='margin-left-3 flex-grow-1 px-1' style={{ backgroundColor: 'white' }}>

              <h5 className='mb-0'>Verification</h5>

              <p className='font-size-13 mb-0'>Badge indicates verified seller status for user authentication on products</p>

              <button className='btn btn-md btn-info'>
                Get Verified
                <img style={{ maxWidth: '20px', marginLeft: '5px', marginBottom: '2px' }} src={verifiedLogo} />
              </button>

              <p className='font-size-13 mb-0'>Become a verified seller</p>

            </div>

            {/* 
          below is an alternate card we can put in the place of verification section
          <div className="card text-bg-success margin-left-3 flex-grow-1 px-1" style={{ "max-width": "18rem" }}>
            <div className="card-header">Verification</div>
            <div className="card-body">
              <h5 className="card-title">
                <button className='btn btn-md btn-info'>
                  Get Verified
                  <img style={{ maxWidth: '20px', marginLeft: '5px', marginBottom: '2px' }} src={verifiedLogo} />
                </button>
              </h5>
              <p className="card-text">Become a verified seller</p>
            </div>
          </div> */}

          </div>

          <div className='mt-2 px-3 rounded-1 custom-height-416' style={{ backgroundColor: 'white' }}>

            <h3 className='mb-2'>Performance</h3>
            <p className='d-flex justify-content-between fs-5 px-2 mb-2 rounded-1' style={{ backgroundColor: '#E6F0F9', color: '#1079CD' }}>
              <span>Buyer's Messages</span>
              <span>0</span>
            </p>
            <p className='d-flex justify-content-between fs-5 px-2 mb-2 rounded-1' style={{ backgroundColor: '#E6F0F9', color: '#1079CD' }}>
              <span>Growth Rate</span>
              <span>0%</span>
            </p>

          </div>
        </div>
        <div className='container mx-0 custom-width-24 rounded-1' style={{ backgroundColor: 'white' }}> {/* the reason we gave custom width to this element and bootstrap classes for other is to make the grid more precise as the grid system for boostrap has 12 columns we gave col-6 to center element and first element col-3 now we wanted somewhere between col-2 and col-3 as giving col-2 would make it too small and giving it col-3 would end up covering the entire width and some margins between and on the borders would not remain  */}
          <h3 className=''>Sales Summary</h3>
        </div>
      </div>
      <AddProduct />
      <h1 className='mt-5'>Your Products</h1>
      <SellerProduct />

    </>
  )
}

export default Shop


// the design should be the three at the top orders add a product sales summary and then below that component should be the sellers product for sale