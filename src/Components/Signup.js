import React, { useState } from 'react'

const Signup = () => {
  const [credentials, setCredentials] = useState({name: '', email: '', password: ''});
  const handleSubmit = () => {

  }
  return (
    <form className='form-margin'>
      <div className="mb-3">
        <label for="exampleInputName" className="form-label">Name</label>
        <input type="text" className="form-control" id="exampleInputName" aria-describedby="nameHelp" placeholder='Name...'/>
      </div>
      <div className="mb-3">
        <label for="exampleInputEmail1" className="form-label">Email address</label>
        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Email...' />
        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
      </div>
      <div className="mb-3">
        <label for="exampleInputPassword1" className="form-label">Password</label>
        <input type="password" className="form-control" id="exampleInputPassword1" placeholder='Password...'/>
      </div>
      <button onSubmit={handleSubmit} type="submit" className="btn btn-primary">Submit</button>
    </form>
  )
}

export default Signup
