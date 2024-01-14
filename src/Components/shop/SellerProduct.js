import React, { useContext, useRef, useState } from 'react'
import ProductContext from '../../context/products/ProductContext'
import SellerProductItem from './SellerProductItem';
import EditProduct from './EditProduct';

const SellerProduct = () => {
  const productContext = useContext(ProductContext);
  const { sellerProducts } = productContext;

  const [productDetails, setProductDetails] = useState({ id: '', name: "", description: "", imageUrl: "", rating: { stars: 0, count: 0 }, keywords: "", condition: '', inStock: true });


  const handleUpdateProduct = (currentProduct) => {
    setProductDetails({ _id: currentProduct._id, name: currentProduct.name, description: currentProduct.description, imageUrl: currentProduct.imageUrl, rating: currentProduct.rating, condition: currentProduct.condition, inStock: currentProduct.inStock });
  }

  return (
    <>
      <div className='container my-5 mx-5'>
        <div className='row'>
          {sellerProducts.map((product) => {
            return (<SellerProductItem key={product._id} id={product._id} imageUrl={product.imageUrl} name={product.name} description={product.description} rating={product.rating} priceCents={product.priceCents} keywords={product.keywords} inStock={product.inStock} condition={product.condition} handleUpdateProduct={handleUpdateProduct} />)
          })}
        </div>
      </div>
    <EditProduct productDetails={productDetails} setProductDetails={setProductDetails}/>
    </>
  )
}

export default SellerProduct
