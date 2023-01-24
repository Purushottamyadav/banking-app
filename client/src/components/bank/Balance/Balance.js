import React from "react";
import './Balance.css'
const Balance=({showModel,setShowModel,visible,data,BalanceAmount})=>{
    if (!visible) return null;
    const cancel = () => {
        setShowModel(!showModel);
    };
    return (
        <div id="main-container">
          <div className="short-container">
            <h1>Your account balance is <span><i class="fa fa-inr" aria-hidden="true"></i> {data}</span></h1>
            
            <div className="buttons">
              <button  onClick={cancel}>
                OK
              </button>
            </div>
          </div>
        </div>
      );
}
export default Balance;
