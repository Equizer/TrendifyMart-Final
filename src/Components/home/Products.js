import React, { useContext, useEffect } from 'react'
import ProductItem from './ProductItem'
import ProductContext from '../../context/products/ProductContext'
import BookmarkedContext from '../../context/bookmarked/BookmarkedContext'

const Products = () => {
  const productContext = useContext(ProductContext);
  const { products } = productContext;
  const bookmarkedContext = useContext(BookmarkedContext);
  const { bookmarkedItems, fetchUserBookmarkedItems, setBookmarkedItems } = bookmarkedContext;

  useEffect(() => {
    localStorage.getItem('token') && fetchUserBookmarkedItems();
  }, [])
  return (
    <div className='container my-5  mx-5'>
      <div className='row'>
        {products.map((product) => {
          let isBookmarked = false;
          console.log(bookmarkedItems);
          isBookmarked = bookmarkedItems.some(item => item && item.productId === product._id);
          return (<ProductItem imageUrl={product.imageUrl} name={product.name} description={product.description} rating={product.rating} priceCents={product.priceCents} keywords={product.keywords} id={product._id} key={product._id} inStock={product.inStock} isBookmarked={isBookmarked} />)
        })}
      </div>
    </div>
  )
}

export default Products
