import React, { useState } from "react";
import SellerContext from "./SellerContext";

const SellerState = (props) => {
  const [seller, setSeller] = useState({});

  const port = 'https://trendifymart-backend.onrender.com'

  const fetchSellerDetails = async () => {
    const response = await fetch(`${port}/api/auth/fetchsellerdetails`, {
      method: 'GET',
      headers: {
        "auth-token": localStorage.getItem('sellerToken')
      }
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem('seller', JSON.stringify(json.user))
      setSeller(JSON.stringify(json.user));
    }
  }

  const deleteSeller = async () => {
    const response = await fetch(`${port}/api/auth/deleteseller`, {
      method: 'GET',
      headers: {
        "Content-type": 'application/json',
        "auth-token": localStorage.getItem('sellerToken')
      }
    });
    const json = await response.json();
    if (json.success) {
    }
  }
  return (
    <SellerContext.Provider value={{ seller, setSeller, deleteSeller, fetchSellerDetails }}>
      {props.children}
    </SellerContext.Provider>
  )
}

export default SellerState 