import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../context/user/UserContext'
import CartContext from '../context/cart/CartContext'
import SellerContext from '../context/seller/SellerContext'
import BookmarkContext from '../context/bookmarked/BookmarkedContext'

const Sidebar = () => {
  const cartContext = useContext(CartContext);
  const { cartItems, fetchCartItems } = cartContext;
  const userContext = useContext(UserContext);
  const { user, setUser } = userContext;
  const sellerContext = useContext(SellerContext);
  const { seller, setSeller } = sellerContext;
  const [isSeller, setIsSeller] = useState(false);
  const bookmarkContext = useContext(BookmarkContext);
  const { setBookmarkedItems } = bookmarkContext
  const logout = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('seller');
    localStorage.removeItem('sellerToken')
    setUser([]);
    setSeller({});
    setIsSeller(false);
    setBookmarkedItems([]);
    
  }

  useEffect(() => {
    // if we dont fetch using the useEffect whenever the sidebar component mounts the number of items in the cart wil not be displayed it will  be either null or 0 
    localStorage.getItem('token') && fetchCartItems();
  }, []);

  useEffect(() => {
    if (localStorage.getItem('sellerToken')) {
      setIsSeller(true)
    }
    else {
      setSeller(false);
    }
  }, [seller]);



  return (
    <div className="text-dark bg-primary" style={{ top: '55px', bottom: '0px', position: 'fixed', width: '135px' }}>

      <Link to='/home'>
        <button className='btn btn-primary container sidebar-items my-2'>
          <div className='sidebar-item-parent'>
            <div className="sidebar-icons">
              <i className="fa-solid fa-house mx-2"></i>
            </div>
            <div className="sidebar-names">Home</div>
          </div>
        </button>
      </Link>

      {localStorage.getItem('sellerToken') ?
        isSeller && <Link to="/myshop">
          <button className='btn btn-primary container sidebar-items my-2'>
            <div className='sidebar-item-parent'>
              <div className="sidebar-icons">
                <i className="fa-solid fa-shop mx-2"></i>
              </div>
              <div className="sidebar-names">My Shop</div>
            </div>
          </button>
        </Link>
        :
        <Link to="/cart">
          <button className='btn btn-primary container sidebar-items my-2'>
            <div className='sidebar-item-parent'>
              <div className="sidebar-icons pos-rel">
                <i className="fa-solid fa-cart-shopping mx-2"></i>
                {localStorage.getItem('token') && <div className="display-cart-quantity rounded-circle text-center bg-dark text-light d-flex justify-content-center align-items-center">{cartItems.length}</div>}
              </div>
              <div className="sidebar-names">Cart</div>
            </div>
          </button>
        </Link>
      }

      <Link to="/saved">
        <button className='btn btn-primary container sidebar-items my-2'>
          <div className='sidebar-item-parent'>
            <div className="sidebar-icons">
              <i className="fa-solid fa-bookmark mx-2"></i>
            </div>
            <div className="sidebar-names">Saved</div>
          </div>
        </button>
      </Link>


      <Link to="/settings">
        <button className='btn btn-primary container sidebar-items my-2'>
          <div className='sidebar-item-parent'>
            <div className="sidebar-icons">
              <i className="fa-solid fa-gear mx-2"></i>
            </div>
            <div className="sidebar-names">Settings</div>
          </div>
        </button>
      </Link>

      <Link to="/about">
        <button className='btn btn-primary container sidebar-items my-2'>
          <div className='sidebar-item-parent'>
            <div className="sidebar-icons">
              <i className="fa-solid fa-circle-info mx-2"></i>
            </div>
            <div className="sidebar-names">About</div>
          </div>
        </button>
      </Link>

      <Link to="/profile">
        <button className='btn btn-primary container sidebar-items my-2'>
          <div className='sidebar-item-parent'>
            <div className="sidebar-icons">
              <i className="fa-solid fa-user mx-2"></i>
            </div>
            <div className="sidebar-names">Profile</div>
          </div>
        </button>
      </Link>

      <Link to="/login">
        <button className='btn btn-primary container sidebar-items my-2' onClick={logout}>
          <div className='sidebar-item-parent'>
            <div className="sidebar-icons">
              <i className="fa-solid fa-right-from-bracket mx-2"></i>
            </div>
            <div className="sidebar-names">Log out</div>
          </div>
        </button>
      </Link>

    </div>


  )
}

export default Sidebar
