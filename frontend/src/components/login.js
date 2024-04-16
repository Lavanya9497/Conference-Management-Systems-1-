import React, { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"

function LoginPage() {
    const history = useNavigate();
    const [uname, setUname] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('user')

    useEffect(() => {
        if (localStorage.getItem('user')) {
            history("/home", { state: { name: localStorage.getItem('user') } })
            return;
        }
        if (localStorage.getItem('admin')) {
            history("/adminhome", { state: { name: localStorage.getItem('user') } })
            return;
        }

    })


    async function submit(e) {
        e.preventDefault();

        try {
            await axios.post("http://localhost:8000", {
                role, uname, password
            })
                .then(res => {
                    if (res.data === "exists" && role === 'user') {
                        localStorage.setItem('user', uname)
                        history("/home", { state: { name: uname, role: role } })
                    } else if (res.data === "exists") {
                        localStorage.setItem('admin', uname)
                        history("/adminhome", { state: { name: uname, role: role } })
                    }
                    else {
                        alert("Invalid Credentials")
                    }
                })
                .catch(e => {
                    alert("Wrong details")
                    console.log(e);
                })
        }
        catch (e) {
            console.log(e);

        }
    }
    const login = (
        <div className="loginbg" style={{ padding: '50px' }}>
            <div class="limiter">
                <div class="container-login">
                    <div class="wrap-login100">
                        <form class="login100-form font_family_poppins" action="POST">
                            <span class="logintitle">
                                Login 
                            </span>
                            <br />
                            <div id="radio" class="padding_bottom_20">
                                <input style={{ marginLeft: '10px', marginRight: '5px' }} type="radio" onClick={(e) => { setRole('user') }} name="role" value="user" id="user" checked={role === "user"} />User
                                <input style={{ marginLeft: '10px', marginRight: '5px' }} type="radio" onClick={(e) => { setRole('organiser') }} name="role" value="organiser" id="organiser" checked={role === "organiser"} />Organiser
                                {/* <input type="radio" onClick={(e) => { setRole('admin') }} name="source" value="admin" id="admin" />Administrator */}
                            </div>
                            <div class="inputbox">
                                <div class="incon">
                                    <i class="fa fa-user icon"></i>
                                </div>
                                <span class="inputlabel">Username</span>
                                <div class="incon">
                                    <input class="inputarea" onChange={(e) => { setUname(e.target.value) }} type="text" name="uname" placeholder="Enter your username" />
                                </div>
                            </div>
                            <br />
                            <div class="inputbox">
                                <div class="incon">
                                    <i class="fa fa-key icon"></i>
                                </div>
                                <span class="inputlabel">Password</span>
                                <div class="incon">
                                    <input class="inputarea" onChange={(e) => { setPassword(e.target.value) }} type="password" name="password" placeholder="Enter your password" />
                                </div>
                            </div>
                            <br />
                            <div class="containerform">
                                <div class="loginbtn">
                                    <button class="loginbtntxt" onClick={submit}>
                                        Login
                                    </button>
                                </div>
                            </div>
                            <br />
                            <div class="containerform">
                                <div class="signupbtn">
                                    <button class="signupbtntxt" onClick={() => history("/signup")}>
                                     CREATE NEW ACCOUNT
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );

    return login;
};

export default LoginPage;