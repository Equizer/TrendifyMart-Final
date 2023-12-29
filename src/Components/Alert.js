import React, { useContext } from 'react'
import AlertContext from '../context/alert/AlertContext'

const Alert = () => {

  const alertContext = useContext(AlertContext);
  const { alert } = alertContext;

  const capitalizeFirstLetter = (word) => {
    return `${word.charAt(0).toUpperCase()}${word.slice(1)}`
  }
  return (
    //  <div className={`alert alert-info `} role="alert">
    //   Alert Message
    // </div>
         alert && <div className={`alert alert-${alert.type} alert-component container-fluid`} role="alert">
         {alert.message}
       </div>
  )
}

export default Alert
