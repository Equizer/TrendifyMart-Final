import UserContext from "./UserContext";
import React, { useState } from 'react';

const UserState = (props) => {
  const [user, setUser] = useState({});

  const port = `http://localhost:5000`

  const getUserData = async () => {
    try {
          const response = await fetch(`${port}/api/auth/getuserdetails`,{
      method: 'GET',
      headers: {
        "Content-type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json();
    if (json.success) {
      setUser(json.user);
      localStorage.setItem('user', JSON.stringify(json.user));
      localStorage.setItem('sellerStatus', JSON.stringify(json.user.seller));
    }
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <UserContext.Provider value={{ getUserData, user, setUser }}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserState

// i dont really need to make a user state context as i am storing the user in the local storage but still made this anyway as i will be more organized
