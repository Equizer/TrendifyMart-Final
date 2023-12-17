import React, { useState } from "react";
import ProgressContext from "./ProgressContext";

const ProgressState = (props) => {
    const [progress, setProgress] = useState(0);
    return(
        <ProgressContext.Provider value={{ progress, setProgress }}>
            {props.children}
        </ProgressContext.Provider>
    )
}


export default ProgressState