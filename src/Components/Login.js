import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import AlertContext from '../context/alert/AlertContext'
import UserContext  from '../context/user/UserContext'
import CartContext from '../context/cart/CartContext';


const Login = () => {
  const alertContext = useContext(AlertContext);
  const { displayAlert } = alertContext;
  const userContext = useContext(UserContext);
  const { getUserData } = userContext;
  const cartContext = useContext(CartContext);
  const { fetchCartItems } = cartContext;
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const port = 'http://localhost:5000';
  const navigate = useNavigate();
  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`${port}/api/auth/login`, {
      method: 'POST',
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    })
    const json = await response.json();

    if (json.success) {
      console.log('logged in');
      localStorage.setItem('token', json.authToken);
      getUserData();
      localStorage.getItem('token') && fetchCartItems(); // we are running this function here becuz of we dont do that here then if after logging in we directlygo to cart then an error stating that cartItems.map is not a function this error occurs when the map function is used on a variable that is not an array. 
      displayAlert('success', 'Logged In!');
      navigate('/home');
    }
    else if (json.error === 'User not found') {
      displayAlert('danger', 'You do not have an account, Sign up to continue');
      navigate('/signup');
    }
  }
  return (
    <form className='form-margin' onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
        <input type="email" name="email" value={credentials.email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onChange} required />
        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
        <input type="password" name="password" value={credentials.password} className="form-control" id="exampleInputPassword1" onChange={onChange} />
      </div>
      <button type="submit" className="btn btn-primary">Login</button>
    </form>
  )
}

export default Login
