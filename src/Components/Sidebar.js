import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../context/user/UserContext'
import CartContext from '../context/cart/CartContext'

const Sidebar = () => {
  const cartContext = useContext(CartContext);
  const { cartItems, fetchCartItems } = cartContext;
  const userContext = useContext(UserContext);
  const { user, setUser } = userContext;
  const [isSeller, setIsSeller] = useState(false);
  const logout = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('seller');
    setUser([]);
  }

  useEffect(() => {
    // if we dont fetch using the useEffect whenever the sidebar component mounts the number of items in the cart wil not be displayed it will  be either null or 0 
    fetchCartItems();
  }, []);

  useEffect(() => {
    const seller = localStorage.getItem('seller') === 'true';
    setIsSeller(seller);
  }, [user]);



  return (
    <div className="text-dark bg-light" style={{ top: '55px', bottom: '0px', position: 'fixed', width: '135px' }}>

      <Link to='/home'>
        <button className='btn btn-light container sidebar-items my-2'>
          <div className='sidebar-item-parent'>
            <div className="sidebar-icons">
              <i className="fa-solid fa-house mx-2"></i>
            </div>
            <div className="sidebar-names">Home</div>
          </div>
        </button>
      </Link>

      <Link to="/cart">
        <button className='btn btn-light container sidebar-items my-2'>
          <div className='sidebar-item-parent'>
            <div className="sidebar-icons pos-rel">
              <i className="fa-solid fa-cart-shopping mx-2"></i>
              {localStorage.getItem('token') && <div className="display-cart-quantity rounded-circle text-center bg-primary text-light d-flex justify-content-center align-items-center">{cartItems.length}</div>}
            </div>
            <div className="sidebar-names">Cart</div>
          </div>
        </button>
      </Link>

      <Link to="/saved">
        <button className='btn btn-light container sidebar-items my-2'>
          <div className='sidebar-item-parent'>
            <div className="sidebar-icons">
              <i className="fa-solid fa-bookmark mx-2"></i>
            </div>
            <div className="sidebar-names">Saved</div>
          </div>
        </button>
      </Link>


      <Link to="/settings">
        <button className='btn btn-light container sidebar-items my-2'>
          <div className='sidebar-item-parent'>
            <div className="sidebar-icons">
              <i className="fa-solid fa-gear mx-2"></i>
            </div>
            <div className="sidebar-names">Settings</div>
          </div>
        </button>
      </Link>

      <Link to="/about">
        <button className='btn btn-light container sidebar-items my-2'>
          <div className='sidebar-item-parent'>
            <div className="sidebar-icons">
              <i className="fa-solid fa-circle-info mx-2"></i>
            </div>
            <div className="sidebar-names">About</div>
          </div>
        </button>
      </Link>

      <Link to="/profile">
        <button className='btn btn-light container sidebar-items my-2'>
          <div className='sidebar-item-parent'>
            <div className="sidebar-icons">
              <i className="fa-solid fa-user mx-2"></i>
            </div>
            <div className="sidebar-names">Profile</div>
          </div>
        </button>
      </Link>

      {isSeller && <Link to="/myshop">
        <button className='btn btn-light container sidebar-items my-2'>
          <div className='sidebar-item-parent'>
            <div className="sidebar-icons">
              <i className="fa-solid fa-shop mx-2"></i>
            </div>
            <div className="sidebar-names">My Shop</div>
          </div>
        </button>
      </Link>}

      <Link to="/login">
        <button className='btn btn-light container sidebar-items my-2' onClick={logout}>
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
