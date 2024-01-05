import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const SellerSignup = () => {
  const [sellerCredentials, setSellerCredentials] = useState({ firstName: "", lastName: "", password: "", email: "", type: "", shopName: "", state: "", contactNumber: null });


  const sellerSignup = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localHost:5000/api/auth/sellersignup', {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        firstName: sellerCredentials.firstName,
        lastName: sellerCredentials.lastName,
        shopName: sellerCredentials.shopName,
        email: sellerCredentials.email,
        password: sellerCredentials.password,
        type: sellerCredentials.type,
        state: sellerCredentials.state,
        contactNumber: sellerCredentials.contactNumber
      })
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem('sellerToken', json.authToken)
    }
    console.log(json)
  }

  const onChange = (event) => {
    event.preventDefault();
    setSellerCredentials({ ...sellerCredentials, [event.target.name]: event.target.value })
    console.log(sellerCredentials);
  }
  return (
    <form className="row g-3 needs-validation margin-top-88" novalidate>
      <div className="col-md-4">
        <label htmlFor="firstName" className="form-label">First name</label>
        <input type="text" className="form-control" id="firstName" required onChange={onChange} name="firstName" value={sellerCredentials.firstName} />
        <div className="valid-feedback">
          Looks good!
        </div>
      </div>
      <div className="col-md-4">
        <label htmlFor="lastName" className="form-label">Last name</label>
        <input type="text" className="form-control" id="lastName" required onChange={onChange} name="lastName" value={sellerCredentials.lastName} />
        <div className="valid-feedback">
          Looks good!
        </div>
      </div>

      <div className="col-md-4">
        <label htmlFor="shopName" className="form-label">Shop name</label>
        <input type="text" className="form-control" id="shopName" required onChange={onChange} name="shopName" value={sellerCredentials.shopName} />
        <div className="invalid-feedback">
          Please provide a Shop name.
        </div>
      </div>

      <div className="col-md-6">
        <label htmlFor="email" className="form-label">Email</label>
        <input type="email" className="form-control" id="email" required onChange={onChange} name="email" value={sellerCredentials.email} />
        <div className="invalid-feedback">
          Please provide a valid email.
        </div>
      </div>

      <div class="col-md-6">
        <label for="password" class="form-label">Password</label>
        <input type="password" className="form-control" id="password" required onChange={onChange} name="password" value={sellerCredentials.password} />
        <div class="invalid-feedback">
          Please select a business type.
        </div>
      </div>

      <div class="col-md-4">
        <label for="validationCustom04" class="form-label">Choose your business type</label>
        <select class="form-select" id="validationCustom04" required onChange={onChange} name="type" value={sellerCredentials.type}>
          <option selected disabled value="">Choose...</option>
          <option value="company">Company</option>
          <option value="individual">Individual</option>
        </select>
        <div class="invalid-feedback">
          Please select a business type.
        </div>
      </div>

      <div className="col-md-4">
        <label htmlFor="dropdown" className="form-label">State</label>
        <select className="form-select" id="dropdown" required onChange={onChange} name="state" value={sellerCredentials.state} >
          <option selected disabled value="">Choose...</option>
          <option value="alabama">Alabama</option>
          <option value="alaska">Alaska</option>
          <option value="arizona">Arizona</option>
          <option value="arkansas">Arkansas</option>
          <option value="california">California</option>
          <option value="colorado">Colorado</option>
          <option value="connecticut">Connecticut</option>
          <option value="delaware">Delaware</option>
          <option value="florida">Florida</option>
          <option value="georgia">Georgia</option>
          <option value="hawaii">Hawaii</option>
          <option value="idaho">Idaho</option>
          <option value="illinois">Illinois</option>
          <option value="indiana">Indiana</option>
          <option value="iowa">Iowa</option>
          <option value="kansas">Kansas</option>
          <option value="kentucky">Kentucky</option>
          <option value="louisiana">Louisiana</option>
          <option value="maine">Maine</option>
          <option value="maryland">Maryland</option>
          <option value="massachusetts">Massachusetts</option>
          <option value="michigan">Michigan</option>
          <option value="minnesota">Minnesota</option>
          <option value="mississippi">Mississippi</option>
          <option value="missouri">Missouri</option>
          <option value="montana">Montana</option>
          <option value="nebraska">Nebraska</option>
          <option value="nevada">Nevada</option>
          <option value="new hampshire">New Hampshire</option>
          <option value="new jersey">New Jersey</option>
          <option value="new mexico">New Mexico</option>
          <option value="new york">New York</option>
          <option value="north carolina">North Carolina</option>
          <option value="north dakota">North Dakota</option>
          <option value="ohio">Ohio</option>
          <option value="oklahoma">Oklahoma</option>
          <option value="oregon">Oregon</option>
          <option value="pennsylvania">Pennsylvania</option>
          <option value="rhode island">Rhode Island</option>
          <option value="south carolina">South Carolina</option>
          <option value="south dakota">South Dakota</option>
          <option value="tennessee">Tennessee</option>
          <option value="texas">Texas</option>
          <option value="utah">Utah</option>
          <option value="vermont">Vermont</option>
          <option value="virginia">Virginia</option>
          <option value="washington">Washington</option>
          <option value="west virginia">West Virginia</option>
          <option value="wisconsin">Wisconsin</option>
          <option value="wyoming">Wyoming</option>
        </select>
        <div className="invalid-feedback">
          Please select a valid state.
        </div>
      </div>
      <div className="col-md-4">
        <label htmlFor="validationCustomContact" className="form-label">Contact number</label>
        <div className="input-group has-validation">
          <span className="input-group-text" id="inputGroupPrepend">+1</span>
          <input type="tel" className="form-control" id="validationCustomContact" aria-describedby="inputGroupPrepend" required name="contactNumber" onChange={onChange} value={sellerCredentials.contactNumber} />
          <div className="invalid-feedback">
            Please enter your Contact Number
          </div>
        </div>
      </div>
      <div className="col-12">
        <div className="form-check">
          <input className="form-check-input" type="checkbox" value="" id="invalidCheck" required />
          <label className="form-check-label" htmlFor="invalidCheck">
            I Agree to <Link to="/t&c">terms and conditions</Link> of TrendifyMart
          </label>
          <div className="invalid-feedback">
            You must agree before submitting.
          </div>
        </div>
      </div>
      <div className="col-12">
        <button className="btn btn-primary" type="submit" onClick={sellerSignup}>Submit form</button>
      </div>
    </form>
  )
}

export default SellerSignup
