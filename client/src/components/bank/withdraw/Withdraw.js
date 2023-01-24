import React from "react";
import './Withdraw.css'
const Withdraw=({showModel,setShowModel,visible,data,withdrawAmount})=>{
    if (!visible) return null;
    const cancel = () => {
        setShowModel(!showModel);
    };
    const okk=()=>{
        withdrawAmount()
        setShowModel(!showModel);
        data(0)
    }
    const value=(e)=>{
      data(e.target.value)
    }
    return (
        <div id="main-container">
          <div className="short-container">
            <h1> Withdraw Amount</h1>
            <div className="inputContainer">
                <input type="number" onChange={value} placeholder=" Enter Your Amount" required/>
            </div>
            
            <div className="buttons">
              <button className="cancel" onClick={cancel}>
                CANCEL
              </button>
              <button type="submit" className="ok" onClick={okk}>
                ok
              </button>
            </div>
          </div>
        </div>
      );
}
export default Withdraw;
