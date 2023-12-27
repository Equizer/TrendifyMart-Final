import React, { useContext } from 'react'
import ProductContext from '../../context/products/ProductContext'

const SellerProduct = () => {
  const productContext = useContext(ProductContext);
  const { sellerProducts } = productContext;
  return (
    <div>
      
    </div>
  )
}

export default SellerProduct
