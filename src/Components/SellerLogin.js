import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const SellerLogin = () => {
  const [sellerCredentials, setSellerCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const onChange = (event) => {
    setSellerCredentials({ ...sellerCredentials, [event.target.name]: event.target.value });
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localHost:5000/api/auth/sellerlogin', {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({email: sellerCredentials.email, password: sellerCredentials.password})
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem('sellerToken', json.authToken);
      navigate('/myshop');
    }
  }
  return (
    <form className='form-margin' onSubmit={handleLogin}>
      <h2>Seller Login</h2>
      <div className="mb-3 ">
        <label for="exampleInputEmail1" className="form-label">Email address</label>
        <input type="email" name="email" value={sellerCredentials.email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onChange} />
      </div>
      <div className="mb-3">
        <label for="exampleInputPassword1" className="form-label">Password</label>
        <input type="password" name="password" value={sellerCredentials.password} className="form-control" id="exampleInputPassword1" onChange={onChange}/>
      </div>
      <button type="submit" className="btn btn-primary">Login</button>
      <span className='mx-3'>Don't have an account? <Link to="/sellersignup">Sign up</Link></span>
    </form>

  )
}

export default SellerLogin
