import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({email: "", password: ""});
  const port = 'http://localhost:5000';
  const navigate = useNavigate();
  const onChange = (event) => {
    setCredentials({...credentials, [event.target.name] : event.target.value});
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`${port}/api/auth/login`, {
      method: 'POST',
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({email: credentials.email, password: credentials.password})
    })
    const json = await response.json();

    if(json.success) {
      localStorage.setItem('token', json.authToken)
      navigate('/home');
    }
    else if(json.error === 'User not found') {
      navigate('signup');
    }
  }
  return (
    <form className='form-margin' onSubmit={handleSubmit}>
    <div className="mb-3">
      <label for="exampleInputEmail1" className="form-label">Email address</label>
      <input type="email" name="email" value={credentials.email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onChange} required/>
      <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
    </div>
    <div className="mb-3">
      <label for="exampleInputPassword1" className="form-label">Password</label>
      <input type="password" name="password" value={credentials.password} className="form-control" id="exampleInputPassword1" onChange={onChange}/>
    </div>
    <button type="submit" className="btn btn-primary">Login</button>
  </form>
  )
}

export default Login
