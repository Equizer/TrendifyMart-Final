import React, { useEffect, useState } from 'react'

const SellerProfile = () => {
  const [profileUser, setProfileUser] = useState({ firstName: '', lastName: '', shopName: '', email: '', type: '', state: '', contactNumber: null, dateJoined: null });
  useEffect(() => {
    setProfileUser({
      firstName: JSON.parse(localStorage.getItem('seller')).firstName,
      lastName: JSON.parse(localStorage.getItem('seller')).lastName,
      shopName: JSON.parse(localStorage.getItem('seller')).shopName,
      email: JSON.parse(localStorage.getItem('seller')).email,
      type: JSON.parse(localStorage.getItem('seller')).type,
      state: JSON.parse(localStorage.getItem('seller')).state,
      contactNumber: JSON.parse(localStorage.getItem('seller')).contactNumber,
      dateJoined: JSON.parse(localStorage.getItem('seller')).dateJoined
    });
  }, [])
  return (
    <div className="card mb-3 margin-top-88 container px-0" style={{ "maxWidth": "100%" }}>
      <div className="row g-0">
        <div className="col-md-4">
          <img src="https://th.bing.com/th/id/OIP.hCfHyL8u8XAbreXuaiTMQgHaHZ?rs=1&pid=ImgDetMain" className="img-fluid rounded-start" alt="..." />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">User Profile</h5>
            <div className='d-flex justify-content-between' style={{ textWrap: 'nowrap' }}>
              <div>
                <p className="card-text font-size-20">First name: {profileUser.firstName}</p>
                <p className="card-text font-size-20">Last name: {profileUser.lastName}</p>
                <p className="card-text font-size-20">Shop name: {profileUser.shopName}</p>
                <p className="card-text font-size-20">Business type: {profileUser.type}</p>
              </div>
              <div>
                <p className="card-text font-size-20">State of origin: {profileUser.state}</p>
                <p className="card-text font-size-20">Contact number: {profileUser.contactNumber}</p>
                <p className="card-text font-size-20">Date joined: {profileUser.dateJoined}</p>
              </div>
            </div>
            <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SellerProfile
