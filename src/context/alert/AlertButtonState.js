import React, { useState } from 'react'
import AlertButtonContext from "./AlertButtonContext";

function AlertButtonState(props) {
  const [alertButton, setAlertButton] = useState(null);

  const displayAlertButton = (type, message) => {
    setAlertButton({ type: type, message: message });
    console.log('display', alertButton)

    setTimeout(() => {
      setAlertButton(null)
    }, 3000)
  }

  return (
    <AlertButtonContext.Provider value={{ displayAlertButton, alertButton, setAlertButton }}>
      {props.children}
    </AlertButtonContext.Provider>
  )
}

export default AlertButtonState; 
