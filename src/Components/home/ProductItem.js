import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import checkmarkImage from '../../images/checkmark.png'
import CartContext from '../../context/cart/CartContext'
import AlertContext from '../../context/alert/AlertContext'
import BookmarkedContext from '../../context/bookmarked/BookmarkedContext'
import ProductContext from '../../context/products/ProductContext'

const ProductItem = (props) => {
  const cartContext = useContext(CartContext);
  const { addToCart, fetchCartItems } = cartContext;
  const alertContext = useContext(AlertContext);
  const { displayAlert } = alertContext;
  const bookmarkedContext = useContext(BookmarkedContext);
  const { addBookmark, bookmarkState, fetchUserBookmarkedItems } = bookmarkedContext;
  const productContext = useContext(ProductContext);
  const { CheckUserReviewStatus, fetchProductStarAvg } = productContext;
  const [quantityState, setQuantityState] = useState(1);



  const handleAddToCart = async () => {
    if (localStorage.getItem('token')) {
      await addToCart(props.id, quantityState);
      localStorage.getItem('token') && fetchCartItems(); // if we dont fetch cart items after adding the product then a error will occur stating that some value is undefined at our time it was cannot read properties of undefined reading imageUrl. 
    }
    else {
      displayAlert('info', 'To start adding products to your Cart, log in or sign up as a buyer.')
    }
  }

  const handleBookmark = async () => {
    if (localStorage.getItem('token')) {
      await addBookmark(props.id, quantityState);
      await fetchUserBookmarkedItems();
    }
    else {
      displayAlert('warning', 'To start Bookmarking items, log in or sign up as a buyer')
    }
  }

  const calculateStarAvg = (starArr) => {
    let avg = 0;
    starArr.forEach((star) => {
      avg += star;
    });
    avg = (avg / starArr.length);
    const roundedAvg = Math.round(avg * 2) / 2;
    console.log(roundedAvg);
    return roundedAvg ? roundedAvg > 5 ? 5 : roundedAvg : 0;
  }

  // useEffect(() => {
  //   limitDescriptionLetters(props.description)
  // }, [])

  const changeQuantity = (event) => {
    const newQuantity = parseInt(event.target.value);
    setQuantityState(newQuantity);
  }
  const limitWords = (name) => {
    const word = name.slice(0, 30);
    return name.length > 30 ? `${word}...` : word
  }

  const handleRatingClick = async () => {
    props.setCurrentProductName(props.name); props.setCurrentProductId(props.id);
    await CheckUserReviewStatus(props.id);
  }
  let limitedDescription = '';
  const limitDescriptionLetters = (description) => {
    limitedDescription = description.slice(0, 31);
    return description.length > 31 ? limitedDescription + '...' : limitedDescription ;
  }

  return (
    <div className='col-md-3 col-12 mb-4'>
      <div className="card">
        <img src={props.imageUrl} className="card-img-top" alt="Product" style={{ height: '250px', padding: '10px' }} />
        <div className="card-body">
          <h5 className="card-title">{limitWords(props.name)}</h5>
          <div className='d-flex justify-content-between align-items-center'>
            <div onClick={handleRatingClick} type="button" data-bs-toggle="modal" data-bs-target={`#ratingStar-${props.id}`} >
              <img src={require(`../../images/ratings/rating-${(calculateStarAvg(props.rating.stars || [0]) * 10)}.png`)} alt="Count" style={{ width: '100px', height: '20px' }} />
              <span className='small-text mx-2'>{props.rating.count}</span>
            </div>
            <div><button className='btn btn-white' onClick={handleBookmark}><i className={`fa-${props.isBookmarked ? 'solid' : 'regular'} fa-bookmark`}></i></button></div>
          </div>
          <div className='d-flex justify-content-between mt-1'>
            <div className="text-success large-text">
              ${(props.priceCents / 100).toFixed(2)}
            </div>
            <select onChange={changeQuantity}>
              <option value="1" key={1}>1</option>
              <option value="2" key={2}>2</option>
              <option value="3" key={3}>3</option>
              <option value="4" key={4}>4</option>
              <option value="5" key={5}>5</option>
              <option value="6" key={6}>6</option>
              <option value="7" key={7}>7</option>
              <option value="8" key={8}>8</option>
              <option value="9" key={9}>9</option>
              <option value="10" key={10}>10</option>
            </select>
            <div style={{ textWrap: 'nowrap' }}>
              <img src={checkmarkImage} style={{ height: '20px' }} className='mx-1' alt="Verified Seller" />
              Verified Seller
            </div>
          </div>
          <p className="card-text">{limitDescriptionLetters(props.description)}</p>
          <div className='d-flex justify-content-between'>
            <div className={`text-${props.inStock ? 'success' : 'danger'} mt-2`} style={{ textWrap: 'nowrap' }}>
              {props.inStock ? 'In Stock' : 'Out of Stock'}
            </div>
            <button type="button" style={{ whiteSpace: 'nowrap' }} onClick={handleAddToCart} className="btn btn-primary product-item-add-button" data-toggle="popover" title="Popover title" data-content="Popover content">
              <i className="fa-solid fa-plus margin-right-5"></i>
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
ProductItem.defaultProps = {
  imageUrl: '',
  rating: {
    stars: 0,
    count: 0
  },
  keywords: ['trending', 'cost effective', 'durable']
};
ProductItem.propTypes = {
  id: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  name: PropTypes.string.isRequired,
  rating: PropTypes.shape({
    stars: PropTypes.arrayOf(PropTypes.number),
    count: PropTypes.number
  }),
  priceCents: PropTypes.number.isRequired,
  // keywords: PropTypes.array
};

// product sample
// {
//   "id": "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
//   "imageUrl": "images/products/athletic-cotton-socks-6-pairs.jpg",
//   "name": "Black and Gray Athletic Cotton Socks - 6 Pairs",
//   "rating": {
//     "stars": 4.5,
//     "count": 87
//   },
//   "priceCents": 1090,
//   "keywords": [
//     "socks",
//     "sports",
//     "apparel"
//   ]
// }

export default ProductItem
