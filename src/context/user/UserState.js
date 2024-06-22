import UserContext from "./UserContext";
import React, { useState } from 'react';

const UserState = (props) => {
  const [user, setUser] = useState({});

  const port = `https://trendifymart-backend.onrender.com`

  const getUserData = async () => {
    try {
      const response = await fetch(`${port}/api/auth/getuserdetails`, {
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
      }
    } catch (error) {
      console.log(error);
    }

  }

  const deleteUser = async () => {
    try {
      const response = await fetch(`${port}/api/auth/deleteuser`, {
        method: 'DELETE',
        headers: {
          'auth-token': localStorage.getItem('token')
        }
      });
      const json = await response.json();
      console.log(json);
      if (json.success) {
        localStorage.removeItem('token');
      }
      else {
        console.log(json);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <UserContext.Provider value={{ getUserData, user, setUser, deleteUser }}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserState

// i dont really need to make a user state context as i am storing the user in the local storage but still made this anyway as i will be more organized
