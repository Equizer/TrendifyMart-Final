import React, { useState, useContext } from 'react'
import UserContext from '../context/user/UserContext';
import { useNavigate } from 'react-router-dom';


const Signup = () => {
  const context = useContext(UserContext);
  const { getuserdata } = context;
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ name: '', email: '', password: '', gender: '', dob: '' });
  const port = `http://localhost:5000`


  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  }



  const handleSubmit = async (event) => {
    event.preventDefault();
 
    const response = await fetch(`${port}/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, gender: credentials.gender, dob: credentials.dob })
    });
    const json = await response.json();

    if (json.success) {
      localStorage.setItem('token', json.authToken);// here we could set the local storage t user but the setUser is async so it might be undefined while trying that way
      getuserdata();
      navigate('/home');
    }
    else if (json.message === "A user with this email already exists") {
      navigate('/login');
    }
  }



  return (
    <form className='form-margin' onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="exampleInputName" className="form-label">Name</label>
        <input name="name" value={credentials.name} type="text" className="form-control" id="exampleInputName" aria-describedby="nameHelp" placeholder='Name...' onChange={onChange} required minLength={3} />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
        <input name="email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Email...' onChange={onChange} required value={credentials.email} />
        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
        <input name="password" value={credentials.password} type="password" className="form-control" id="exampleInputPassword1" placeholder='Password...' onChange={onChange} minLength={6} required />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputGender1" className="form-label">Gender</label>
        <input name="gender" value={credentials.gender} type="text" className="form-control" id="exampleInputGender1" placeholder='Gender...' onChange={onChange} required />
      </div>

      <div className="mb-3">
        <label htmlFor="exampleInputDob1" className="form-label">Date of birth</label>
        <input name="dob" value={credentials.dob} type="date" className="form-control" id="exampleInputDob1" placeholder='DOB...' onChange={onChange} required />
      </div>

      <button type="submit" className="btn btn-primary" disabled={credentials.name.length <= 2 || credentials.password.length <= 5 || credentials.email === '' || credentials.gender === '' || credentials.dob === ''}>Signup</button>
    </form>
  )
}

export default Signup
