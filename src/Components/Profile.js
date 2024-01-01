import React, { useState, useEffect } from 'react'

const Profile = () => {
  const [ profileUser, setProfileUser ] = useState({name: "", email: "", dob: "", gender: ""});

  useEffect(() => {
  setProfileUser({ 
    name: JSON.parse(localStorage.getItem('user')).name,
    email: JSON.parse(localStorage.getItem('user')).email,
    dob: JSON.parse(localStorage.getItem('user')).dob,
    gender: JSON.parse(localStorage.getItem('user')).gender
 });
  });
  return (
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
  )
}

export default Profile
