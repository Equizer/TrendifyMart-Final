import UserContext from "./UserContext";
import React, { useState } from 'react';

const UserState = (props) => {
  const [user, setUser] = useState({});

  const port = `http://localhost:5000`

  const getuserdata = async () => {
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
    }
    console.log(json);
  }

  return (
    <UserContext.Provider value={{ getuserdata }}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserState

// i dont really need to make a user state context as i am storing the user in the local storage but still made this anyway as i will be more organized
