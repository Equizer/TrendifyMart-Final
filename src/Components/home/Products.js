import React, { useContext } from 'react'
import ProductItem from '../ProductItem'
import ProductContext from '../../context/products/ProductContext'

const Products = () => {
  const context = useContext(ProductContext);
  const { products } = context;
  const allProducts = products;

  return (
    <div className='container my-5  mx-5'>
      <div className='row'>
        {allProducts.map((product) => {
          return (<ProductItem imageUrl={product.imageUrl} name={product.name} description={product.description} rating={product.rating} priceCents={product.priceCents} keywords={product.keywords} id={product._id} key={product._id} />)
        })}
      </div>
    </div>
  )
}

export default Products
