import React, { useState } from "react";
import AlertContext from './AlertContext'

const AlertState = (props) => {
  const [alert, setAlert] = useState(null);

  const displayAlert = (type, message) => {

    setAlert({ type: type, message, message });

    setTimeout(() => {
      setAlert(null);
    }, 1500);

  }
  return (
    <AlertContext.Provider value={{ alert, setAlert, displayAlert }}>
      {props.children}
    </AlertContext.Provider>
  )
}

export default AlertState