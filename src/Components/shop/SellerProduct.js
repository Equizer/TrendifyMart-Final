import React, { useContext } from 'react'
import ProductContext from '../../context/products/ProductContext'
import SellerProductItem from './SellerProductItem';

const SellerProduct = () => {
  const productContext = useContext(ProductContext);
  const { sellerProducts } = productContext;
  return (
    <div className='container my-5 mx-5'>
      <div className='row'>
        {sellerProducts.map((product) => {
          return(<SellerProductItem key={product._id} id={product._id} imageUrl={product.imageUrl} name={product.name} description={product.description} rating={product.rating} priceCents={product.priceCents} keywords={product.keywords} inStock={product.inStock} condition={product.condition}/>)
        })}
      </div>
      
    </div>
  )
}

export default SellerProduct
