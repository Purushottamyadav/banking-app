import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"

const Login = () => {
    const navigate = useNavigate()

    const view = false;
    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const submitData = (e) => {
        e.preventDefault()
        fetch("http://localhost:8000/signin", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: data.email,
                password: data.password
            })
        }).then(res => res.json()).then(data => {
            if (data.message.err) console.log(data.mesaage)
            if (data.message === "Invalid Details") {
                alert('Please Enter valid Details')
                navigate('/')
            }
            if (data.message === "Please Register First") {
                alert('Please register then signIn')
                navigate('/')
            }
            if (data.message === "Success") {
                sessionStorage.setItem('accessToken', data.token)
                sessionStorage.setItem('userId', data.email)
                navigate('/bank')
            }
        })
    }


    return (
        <>
            <div className="containers">

                <div className="form-container">

                    <form className="loginForm" onSubmit={(e) => submitData(e)}>
                        <h3>Account SignIn</h3>
                        <input type="email" name="email" value={data.email} onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })} id="" className="user-id" placeholder="User ID" required />
                        <br />
                        <div style={{ position: "relative" }}>

                            <input type={view ? "text" : "password"} name="password" value={data.password} onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })} className="password" placeholder="Password" required />
                        </div>
                        <button type="submit" className="loginButton">LOGIN</button>
                        <button onClick={() => navigate('/signup')} className="sign-up">REGISTER</button>

                    </form>

                </div>
            </div>
        </>
    )
}

export default Login;