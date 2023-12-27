import React, { useContext, useEffect } from 'react'
import ProductContext from '../../context/products/ProductContext'
import Searchbar from './Searchbar'
import Products from './Products'
import ProgressContext from '../../context/progress/ProgressContext'

const Home = () => {
  const progressContext = useContext(ProgressContext);
  const productContext = useContext(ProductContext);
  const { fetchAllProducts } = productContext
  const { setProgress } = progressContext;
  useEffect(() =>{ 
    fetchAllProducts();
  }, [])
  return (
    <div className='mx-2 body-content'>
      <Searchbar />
      <Products />
    </div>
  )
}

export default Home
