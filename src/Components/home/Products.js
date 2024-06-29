import React, { useContext, useEffect, useState } from 'react'
import ProductItem from './ProductItem'
import ProductContext from '../../context/products/ProductContext'
import BookmarkedContext from '../../context/bookmarked/BookmarkedContext'
import RatingStarModal from '../RatingStarModal'

const Products = () => {
  const productContext = useContext(ProductContext);
  const { products } = productContext;
  const bookmarkedContext = useContext(BookmarkedContext);
  const { bookmarkedItems, fetchUserBookmarkedItems, setBookmarkedItems } = bookmarkedContext;
  const [currentStarProductName, setCurrentProductName] = useState('');
  const [currentStarProductId, setCurrentProductId] = useState('');

  useEffect(() => {
    localStorage.getItem('token') && fetchUserBookmarkedItems();
  }, [])
  return (
    <div className='container my-5  mx-5'>
      <div className='row'>
        {products.map((product) => {
          let isBookmarked = false;
          isBookmarked = bookmarkedItems.some(item => item && item.productId === product._id);
          return (
            <React.Fragment key={product._id}>
              <ProductItem imageUrl={product.imageUrl} name={product.name} description={product.description} rating={product.rating} priceCents={product.priceCents} keywords={product.keywords} id={product._id}  inStock={product.inStock} isBookmarked={isBookmarked} setCurrentProductName={ setCurrentProductName } currentStarProductName={ currentStarProductName } currentStarProductId={ currentStarProductId } setCurrentProductId={setCurrentProductId}/>
              <RatingStarModal name={product.name}  id={product._id} currentStarProductName={ currentStarProductName } setCurrentProductName={setCurrentProductName}  currentStarProductId={ currentStarProductId } setCurrentProductId={setCurrentProductId}/>
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}

export default Products