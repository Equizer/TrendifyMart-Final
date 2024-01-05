import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Profile = () => {
  const [profileUser, setProfileUser] = useState({ name: "", email: "", dob: "", gender: "" });

  useEffect(() => {
    // set the user in the state only if the there is a token in the local storage that means set only if the user is logged in
     localStorage.getItem('token') && setProfileUser({
      name: JSON.parse(localStorage.getItem('user')).name || '',
      email: JSON.parse(localStorage.getItem('user')).email || '',
      dob: JSON.parse(localStorage.getItem('user')).dob || '',
      gender: JSON.parse(localStorage.getItem('user')).gender || ''
    });
  });
  return (
    <>
    { localStorage.getItem('token') ? 
      <div class="card mb-3 margin-top-88 container px-0" style={{ "max-width": "540px" }}>
        <div class="row g-0">
          <div class="col-md-4">
            <img src="https://th.bing.com/th/id/OIP.hCfHyL8u8XAbreXuaiTMQgHaHZ?rs=1&pid=ImgDetMain" class="img-fluid rounded-start" alt="..." />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">User Profile</h5>
              <p class="card-text">Name: {profileUser.name}</p>
              <p class="card-text">Email: {profileUser.email}</p>
              <p class="card-text">Date Of Birth: {profileUser.dob}</p>
              <p class="card-text">Gender: {profileUser.gender}</p>
              <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
            </div>
          </div>
        </div>
      </div>
      : 
      <div class="card text-bg-info mb-3 container margin-top-88" style={{ "max-width": "18rem" }}>
        <div class="card-header">You are not Signed in!</div>
        <div class="card-body">
          <h5 class="card-title">Authentication Required</h5>
          <p class="card-text">Login or Signup to access your Profile.</p>
          <Link className='btn btn-primary' to="/login">Login</Link>
          <Link className='btn btn-primary mx-2' to="/signup">Signup</Link>
        </div>
      </div>
}
    </>
  )
}

export default Profile
