import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import checkmarkImage from '../../images/checkmark.png'
import CartContext from '../../context/cart/CartContext'

const ProductItem = (props) => {
  const cartContext = useContext(CartContext);
  const { addToCart } = cartContext;
  const limitWords = (name) => {
    const word = name.slice(0, 30);
    return name.length > 30 ?  `${word}...` :  word
  }
  return (
    <div className='col-md-3 col-12 mb-4'>
      <div className="card">
        <img src={props.imageUrl} className="card-img-top" alt="Product" style={{height: '250px', padding: '10px'}}/>
        <div className="card-body">
          <h5 className="card-title">{limitWords(props.name)}</h5>
          <div>
            <img src={require(`../../images/ratings/rating-${(props.rating.stars) * 10}.png`)} alt="Count" style={{ width: '100px', height: '20px' }} />
            <span className='small-text mx-2'>{props.rating.count}</span>
          </div>
          <div className='d-flex justify-content-between mt-1'>
            <div className="text-success large-text">
              ${(props.priceCents / 100).toFixed(2)}
            </div>
            <div style={{ textWrap: 'nowrap' }}>
              <img src={checkmarkImage} style={{ height: '20px' }} className='mx-1' alt="Verified Seller" />
              Verified Seller
            </div>
          </div>
          <p className="card-text">{props.description}</p>
          <div className='d-flex justify-content-between'>
            <div className={`text-${props.inStock ? 'success' : 'danger'} mt-2`} style={{ textWrap: 'nowrap' }}>
              {props.inStock ? 'In Stock' : 'Out of Stock'}
            </div>
            <button style={{ whiteSpace: 'nowrap' }} onClick={() => { addToCart(props.id) }} className="btn btn-primary product-item-add-button">
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
image: '',
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
    stars: PropTypes.number,
    count: PropTypes.number
  }),
  priceCents: PropTypes.number.isRequired,
  // keywords: PropTypes.array
};
// {
//   "id": "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
//   "image": "images/products/athletic-cotton-socks-6-pairs.jpg",
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
