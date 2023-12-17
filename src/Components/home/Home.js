import React, { useContext, useEffect } from 'react'
import Searchbar from './Searchbar'
import Products from './Products'
import ProgressContext from '../../context/progress/ProgressContext'

const Home = () => {
  const progressContext = useContext(ProgressContext);
  const { setProgress } = progressContext;
  useEffect(() =>{ 
    setTimeout(() => {
      setProgress(30);
    }, 300);
    setTimeout(() => {
      setProgress(70);
      
    }, 600);
    setTimeout(() => {
          setProgress(100)

    }, 1000);
  }, [])
  return (
    <div className='mx-2 body-content'>
      <Searchbar />
      <Products />
    </div>
  )
}

export default Home
