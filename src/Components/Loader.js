import React from "react";
import spinner from '../images/Spinner.gif'

const Loader = () => {
  return (
    <div className="text-center">
      <img src={spinner} alt="Loading"/>
    </div>
  )
}

export default Loader