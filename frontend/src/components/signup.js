import React, { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"

function SignupPage() {

    const history = useNavigate();
    const [name, setName] = useState('')
    const [affiliation, setAffiliation] = useState('')
    const [affiliation_address, setAddress] = useState('')
    const [email, setEmail] = useState('')
    const [contact_no, setContact] = useState('')
    const [website, setLink] = useState('')
    const [image, setImage] = useState('')
    const [username, setUname] = useState('')
    const [password, setPassword] = useState('')

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
        if (!name.trim()) {
            alert('Please enter your name');
            return;
        }
        if (!affiliation.trim()) {
            alert('Please enter your affiliation');
            return;
        }
        if (!affiliation_address.trim()) {
            alert('Please enter your affiliation address');
            return;
        }
        if (!email.trim()) {
            alert('Please enter your email');
            return;
        }
        if (!contact_no.trim()) {
            alert('Please enter your contact number');
            return;
        }
        if (!website.trim()) {
            alert('Please enter your website link');
            return;
        }
        if (!username.trim()) {
            alert('Please enter a username');
            return;
        }
        if (!password.trim()) {
            alert('Please enter a password');
            return;
        }
        try {
            await axios.post("http://localhost:8000/signup", {
                name, affiliation, affiliation_address, email, contact_no, website, image, username, password
            })
                .then(res => {
                    if (res.data === "exist") {
                        alert("User already exist")
                    }
                    else if (res.data === "notexist") {
                        history("/home", { state: { name: username, role: 'user' } })
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

    const signup = (
        <div class="loginbg limiter" style={ {padding: '10px'} }>
            <div class="container-login">
                <div class="wrap-login100">
                    <form class="login100-form font_family_poppins" action="POST">
                        <span class="logintitle">
                            Sign Up
                        </span>
                        <br />
                        <div class="signup-inputbox">
    <div class="incon">
        <i class="fa fa-user icon"></i>
    </div>
    <span class="signup-inputlabel">Name</span>
    <div class="incon">
        <input class="signup-inputarea" type="text" onChange={(e) => { setName(e.target.value) }} name="name" placeholder="Type your name" />
    </div>
</div>
<br />
<div class="signup-inputbox">
    <div class="incon">
        <i class="fa fa-user icon"></i>
    </div>
    <span class="signup-inputlabel">Affiliation</span>
    <div class="incon">
        <input class="signup-inputarea" type="text" onChange={(e) => { setAffiliation(e.target.value) }} name="affiliation" placeholder="Type your affiliation" />
    </div>
</div>
<br />
<div class="signup-inputbox">
    <div class="incon">
        <i class="fa fa-user icon"></i>
    </div>
    <span class="signup-inputlabel">Affiliation address</span>
    <div class="incon">
        <input class="signup-inputarea" type="text" onChange={(e) => { setAddress(e.target.value) }} name="affiliation_address" placeholder="Type your affiliation address" />
    </div>
</div>
<br />
<div class="signup-inputbox">
    <div class="incon">
        <i class="fa fa-envelope icon"></i>
    </div>
    <span class="signup-inputlabel">Email</span>
    <div class="incon">
        <input class="signup-inputarea" type="email" onChange={(e) => { setEmail(e.target.value) }} name="email" placeholder="Type your email" />
    </div>
</div>
<br />
<div class="signup-inputbox">
    <div class="incon">
        <i class="fa fa-phone icon"></i>
    </div>
    <span class="signup-inputlabel">Contact info</span>
    <div class="incon">
        <input class="signup-inputarea" type="number" onChange={(e) => { setContact(e.target.value) }} name="contact" placeholder="Type your contact" />
    </div>
</div>
<br />
<div class="signup-inputbox">
    <div class="incon">
        <i class="fa fa-link icon"></i>
    </div>
    <span class="signup-inputlabel">Website</span>
    <div class="incon">
        <input class="signup-inputarea" type="text" onChange={(e) => { setLink(e.target.value) }} name="website" placeholder="Type your website" />
    </div>
</div>
<br />
<div class="signup-inputbox">
    <div class="incon">
        <i class="fa fa-link icon"></i>
    </div>
    <span class="signup-inputlabel">Profile Picture</span>
    <div class="incon">
        <input class="signup-inputarea" type="text" onChange={(e) => { setImage(e.target.value) }} name="image" placeholder="Enter link to profile picture" />
    </div>
</div>
<br />
<div class="signup-inputbox">
    <div class="incon">
        <i class="fa fa-user icon"></i>
    </div>
    <span class="signup-inputlabel">User Name</span>
    <div class="incon">
        <input class="signup-inputarea" type="text" onChange={(e) => { setUname(e.target.value) }} name="uname" placeholder="Type your user name" />
    </div>
</div>
<br />
<div class="signup-inputbox">
    <div class="incon">
        <i class="fa fa-key icon"></i>
    </div>
    <span class="signup-inputlabel">Password</span>
    <div class="incon">
        <input class="signup-inputarea" type="password" onChange={(e) => { setPassword(e.target.value) }} name="password" placeholder="Type your password" />
    </div>
</div>
<br />


                        <div class="containerform">
                            <div class="loginbtn">
                                <button class="loginbtntxt" onClick={submit}>
                                    Signup
                                </button>
                            </div>
                        </div>
                        <br />
                        <div class="flex-col-c">
                            <span class="txt1">
                                
                            </span>
                         
                         <h1>   <Link class="txt2 alink" to="/">Login</Link></h1>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )

    return signup

}

export default SignupPage