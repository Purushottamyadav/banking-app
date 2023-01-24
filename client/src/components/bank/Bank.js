import { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import './Bank.css'
import Withdraw from './withdraw/Withdraw'
import Success from "./Success/Success";
import Deposit from './Deposit/Deposit'
import Balance from "./Balance/Balance";
const Bank=()=>{
    const userId=sessionStorage.getItem("userId")
    const [showModel,setShowModel]=useState(false)
    const [data,setData]=useState(0)
    const [success,setSuccess]=useState(false)
    const[deposit,setDeposit]=useState(false)
    const[balace,setBalance]=useState(false)
    const[show,setShow]=useState()
    const navigate = useNavigate()

    const logout=()=>{
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("userId");
        navigate("/");
    }
    const withdrawAmount=()=>{
        if(data===0){
            alert('please enter valid amount')
            setSuccess(false)
        }
        fetch("http://localhost:8000/withdraw", {
                method: "post",
                headers: {
                    accessToken: sessionStorage.getItem("accessToken"),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    amount:data
                })
            }).then(res => res.json()).then(data => {
                if (data.message) console.log(data.message)
                if(data.message==="successfull"){
                    setSuccess(true)
                }
                if(data.message==='Your Balance Is Low'){
                    alert("Your Balance is Low")
                }
                if(data.message==='Please enter valid Amount'){
                    alert("Please Enter valid Amount")
                }           
             })
    }
    const depositAmount=()=>{
        if(data===0){
            alert('please enter valid amount')
            setSuccess(false)
        }
        fetch("http://localhost:8000/deposit", {
                method: "post",
                headers: {
                    accessToken: sessionStorage.getItem("accessToken"),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    amount:data
                })
            }).then(res => res.json()).then(data => {
                if (data.message) console.log(data.mesaage)
                if(data.message==="successfull"){
                    setSuccess(true)
                }
            })
    }
    const balanceAmount=()=>{
        fetch("http://localhost:8000/request", {
            method: "get",
            headers: {
                accessToken: sessionStorage.getItem("accessToken"),
                "Content-Type": "application/json",
            }
        }).then(res => res.json()).then(data => {
            if (data.message) console.log(data.mesaage)
            if(data.message==="success"){
                setShow(data.amount)
            }
            
        })
    }
    useEffect(()=>{
        if(!sessionStorage.getItem("accessToken")){
            navigate("/")
        }
    })
    useEffect(()=>{
        balanceAmount()
    },[balace])
    
    return(
        <>  
        <header className="header-container">
        <div>
        <h3>WELCOME </h3>
            <div className="logoutButton">
                    <button onClick={logout}><i class="fa fa-sign-out" aria-hidden="true"></i> Logout</button>
                </div>
            
        </div>
            <div>
                <h3>@
                {userId.split('@')[0]}
                </h3>
                 <div className="image-container">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM9QUAIcIQF513aLIw3mrtkPynPMhpuL260Q&usqp=CAU" alt="userPic" />
                 </div>
            </div>
        </header>
            <div className="buttonContainer">
                <div className="all-payment">
                    <button onClick={()=>setShowModel(true)}> Click Here to Withdraw</button>
                    <button onClick={()=>setDeposit(true)}> Click Here to Deposit </button>
                    <button onClick={()=>setBalance(true)}> Click Here to Check Balance</button>
                </div>
                <Withdraw setShowModel={setShowModel}
                            showModel={showModel}
                            visible={showModel} 
                            data={setData}
                            withdrawAmount={withdrawAmount}
                            />
                <Success setShowModel={setSuccess}
                            showModel={success}
                            visible={success} />
                <Deposit setShowModel={setDeposit}
                            showModel={deposit}
                            visible={deposit} 
                            data={setData}
                            depositAmount={depositAmount}
                            />
                <Balance setShowModel={setBalance}
                            showModel={balace}
                            visible={balace} 
                            data={show}
                            balanceAmount={balanceAmount} />
                
            </div>
            
        </>
    )
}
export default Bank;
