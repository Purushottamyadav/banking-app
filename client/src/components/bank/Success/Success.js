import React from "react";
import './Success.css'
const Success=({showModel,setShowModel,visible})=>{
    if (!visible) return null;
    const cancel = () => {
        setShowModel(!showModel);
    };
    return (
        <div id="main-container" onClick={cancel}>
          <div className="short-container">
           
            <h1>Successfull</h1>
          </div>
        </div>
      );
}
export default Success;