import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  const logout = async () => {
    localStorage.removeItem('token');
  }
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
            <div className="sidebar-icons">
              <i className="fa-solid fa-cart-shopping mx-2"></i>
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

      <Link to="/myshop">
        <button className='btn btn-light container sidebar-items my-2' onClick={logout}>
          <div className='sidebar-item-parent'>
            <div className="sidebar-icons">
              <i class="fa-solid fa-shop mx-2"></i>
            </div>
            <div className="sidebar-names">My Shop</div>
          </div>
        </button>
      </Link>

    </div>
  )
}

export default Sidebar
