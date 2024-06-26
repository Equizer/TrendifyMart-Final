import React from 'react'
import { Link } from 'react-router-dom'
import BuyerProfile from './BuyerProfile';
import SellerProfile from './SellerProfile';

const Profile = () => {
  function renderProfileInfo() {
    if (localStorage.getItem('token')) {
      return <BuyerProfile />
    }
    else if (localStorage.getItem('sellerToken')) {
      return <SellerProfile />
    }
    else {
      return (
        <div class="card text-bg-info mb-3 container margin-top-88" style={{ "maxWidth": "18rem" }}>
          <div class="card-header">You are not Signed in!</div>
          <div class="card-body">
            <h5 class="card-title">Authentication Required</h5>
            <p class="card-text">Login or Signup to access your Profile.</p>
            <Link className='btn btn-primary' to="/login">Login</Link>
            <Link className='btn btn-primary mx-2' to="/signup">Signup</Link>
          </div>
        </div>
      )
    }
  }
  return (
    <>
      {renderProfileInfo()}
    </>
  )
}

export default Profile
