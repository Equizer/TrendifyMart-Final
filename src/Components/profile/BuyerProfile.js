import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/user/UserContext'
const BuyerProfile = () => {
  const [profileUser, setProfileUser] = useState({ name: "", email: "", dob: "", gender: "",dateJoined: null });
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const { deleteUser } = userContext;
  const handleDeleteUser = async () => {
    await deleteUser();
    navigate('/signup');
  }

  useEffect(() => {
    // set the user in the state only if the there is a token in the local storage that means set only if the user is logged in
    setProfileUser({
      name: JSON.parse(localStorage.getItem('user')).name || '',
      email: JSON.parse(localStorage.getItem('user')).email || '',
      dob: JSON.parse(localStorage.getItem('user')).dob || '',
      gender: JSON.parse(localStorage.getItem('user')).gender || '',
      dateJoined: JSON.parse(localStorage.getItem('user')).dateJoined || ''
    })
  }, []);
  return (
    <>
    <div className="card mb-3 margin-top-88 container px-0" style={{ "maxWidth": "540px" }}>
      <div className="row g-0">
        <div className="col-md-4 d-flex flex-column align-items-center justify-content-center">
          <img src="https://th.bing.com/th/id/OIP.hCfHyL8u8XAbreXuaiTMQgHaHZ?rs=1&pid=ImgDetMain" className="img-fluid rounded-start" alt="..." />
          <div className='mt-3 d-flex'>
          <button className='btn btn-sm btn-danger col-md-8 text-nowrap' onClick={handleDeleteUser}>Delete Account</button>
          <button className='btn btn-sm btn-danger mx-2 disabled'><i className="fa-solid fa-eye-slash"></i></button>
          </div>
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">User Profile</h5>
            <p className="card-text">Name: {profileUser.name}</p>
            <p className="card-text">Email: {profileUser.email}</p>
            <p className="card-text">Date Of Birth: {new Date(profileUser.dob).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p className="card-text">Gender: {profileUser.gender}</p>
            <p className="card-text">Date joined: {new Date(profileUser.dateJoined).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default BuyerProfile
