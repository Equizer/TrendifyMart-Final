import React, { useState, useRef, useContext } from 'react'
import ProductContext from '../../context/products/ProductContext';

const AddProduct = () => {
  const productContext = useContext(ProductContext);
  const { addProduct, fetchSellerProducts } = productContext;

  const [conditionState, setConditionState] = useState('new');

  const [productDetails, setProductDetails] = useState({ name: "", imageUrl: "https://www.pickfu.com/blog/wp-content/uploads/2019/09/test3.jpeg", description: "",  priceCents: "", keywords: "", condition: conditionState, quantity: 1, inStock: true });


  const closeModalRef = useRef(null);

  const handleConditionChange = (condition) => {
    setConditionState(condition);
  }


  const onChange = (event) => {
    setProductDetails({ ...productDetails, [event.target.name]: event.target.value });
  }


  const handleClick = async (e) => {
    e.preventDefault();
    await addProduct(productDetails.name, productDetails.imageUrl, productDetails.description, productDetails.rating, productDetails.priceCents * 100, productDetails.keywords, conditionState, productDetails.inStock);
    fetchSellerProducts();
    closeModalRef.current.click();
  }


  return (
    <>
      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">List a Product</h1>
              <button ref={closeModalRef} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="row mb-3">
                  <label htmlFor="productName" className="col-sm-2 col-form-label">Product Name:</label>
                  <div className="col-sm-10">
                    <input name="name" value={productDetails.name} type="text" className="form-control" id="productName" placeholder="Product Name..." onChange={onChange} />
                  </div>
                </div>

                <div className="row mb-3">
                  <label htmlFor="productDesc" className="col-sm-2 col-form-label">Product Description:</label>
                  <div className="col-sm-10">
                    <input name="description" value={productDetails.description} type="text" className="form-control" id="productDesc" placeholder="Product Description..." onChange={onChange} />
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="productPassword" className="col-sm-2 col-form-label">Add Product's Images:</label>
                  <div className="col-sm-10">
                    <input type="file" className="form-control" id="productPassword" style={{ width: '100%' }} />
                  </div>
                </div>

                <div className='d-flex justify-content-start'>
                  <div className="row mb-3 col-3">
                    <label htmlFor="productPassword" className="col-sm-2 col-form-label" style={{ width: 'auto' }}>MRP:</label>
                    <div className="col-sm-6">
                      <input name="priceCents" value={productDetails.priceCents} type="number" className="form-control" id="productPassword" style={{ width: '100%' }} placeholder="MRP..." onChange={onChange} />
                    </div>
                  </div>
                  <div className="row mb-3 col-3 mx-2">
                    <label htmlFor="productPassword" className="col-sm-3 col-form-label" style={{ width: 'auto' }}>Quantity:</label>
                    <div className="col-sm-6">
                      <input name="quantity" value={productDetails.quantity} type="number" className="form-control" id="productPassword" style={{ width: '100%' }} placeholder="Quantity..." onChange={onChange} />
                    </div>
                  </div>
                  <div className="row mb-3 col-3 mx-2">
                    <div className="col-sm-6">
                      <div className="btn-group">
                        {/* <button type="button" className="btn btn-danger" style={{ width: 'auto' }}>Condition</button>
                      <button type="button" className="btn btn-danger dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                        <span className="visually-hidden">Toggle Dropdown</span>
                      </button>
                      <ul className="dropdown-menu">
                        <li><a className="dropdown-item" onClick={() => { handleConditionChange('new') }}>New</a></li>
                        <li><a className="dropdown-item" onClick={() => { handleConditionChange('second hand') }}>Second Hand</a></li>
                        <li><a className="dropdown-item" onClick={() => { handleConditionChange('old') }}>Old</a></li>
                      </ul> */}
                        <select onClick={(e) => { handleConditionChange(e.target.value) }}>
                          <option value="new">New</option>
                          <option value="second hand">Second Hand</option>
                          <option value="old">Old</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-3 col-3 mx-2">
                    <label htmlFor="keywords" className="col-sm-3 col-form-label" style={{ width: 'auto' }}>Keywords:</label>
                    <div className="col-sm-6">
                      <input name="keywords" value={productDetails.keywords} type="text" className="form-control" id="keywords" style={{ width: '100%' }} placeholder="Keywords..." onChange={onChange} />
                    </div>
                  </div>
                  <div>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Discard</button>
              <button type="submit" onClick={handleClick} className="btn btn-primary" data-bs-dismiss="modal">Add Product</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddProduct
