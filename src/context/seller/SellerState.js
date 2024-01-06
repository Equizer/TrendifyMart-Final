import React, { useState } from "react";
import SellerContext from "./SellerContext";

const SellerState = (props) => {
  const [seller, setSeller] = useState({});
  return(
    <SellerContext.Provider>
      {props.children}
    </SellerContext.Provider>
  )
}

export default SellerState 