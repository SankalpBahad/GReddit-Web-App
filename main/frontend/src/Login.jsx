import { Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
export const Login = (props) => {
    useEffect(() => {
        document.addEventListener("click", (e) => {
            if (e.target.placeholder)
                e.target.placeholder = "";
        })
    }, [])
    const navigate = useNavigate();
    const [uname, setUname] = useState('');
    const [passw, setPassw] = useState('');
    const [users, setUsers] = useState([]);
    // if (localStorage.getItem("username") == "admin" && localStorage.getItem("password") == "admin") {
    //     // alert("Please Login to continue");
    //     // console.log("Please Login to continue");
    //     window.location.href = ('/profile');
    // }
    // console.log(uname,"THIS OUTPUT")
    const fn = async () => {
        // if (uname == "admin" && passw == "admin") {

        //     navigate("/all-sub-greddiits");
        // }
        // else {
        //     alert("Invalid Credentials")
        // }
        // console.log(data)

        const resp = await axios.post("http://localhost:8000/login")
        // console.log(resp)
        // console.log("no error")
        // console.log(resp.data);
        setUsers(resp.data)
        // alert("Press Login again to continue") 
        // console.log(users);
        users.map((index) => {
            // console.log(index.user_name)
            if (uname === index.user_name && passw === index.password) {
                localStorage.setItem("username", uname);
                localStorage.setItem("password", passw);
                navigate('/');
            }
        }
        )
        // alert("Invalid Credentials")
        if (localStorage.getItem("username") === null) {
            alert("Invalid Credentials")
        }
    }
    const submitted = async (x) => {
        x.preventDefault();
    }

    // axios({
    //     method:'GET',
    //     url:'http://localhost:8000/users'
    // }).then((response)=>{
    //     setUsers(response.data)
    // }).catch((error)=>console.error(error))
    return (
        <div align="center">
            <br /><br /><br /><br /><br />
            <form className='form' style={{
                color: 'black',
                backgroundColor: "white",
                width: 400,
                height: 420
            }} onSubmit={submitted}>
                <div >
                    <br />
                    {/* <p style={{ fontSize:'2rem' }}>Login &nbsp;&nbsp;&nbsp;&nbsp; Register</p> */}
                    <td style={{ fontSize: '50px' }}>Login&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td style={{ fontSize: '20px' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Register</td>
                    <p>-----------------------------------------------------------</p>
                    <TextField id="standard-basic" label="Username" variant="standard" type="text" value={uname} onChange={(e) => setUname(e.target.value)} />
                    <br /><br />
                    <TextField id="standard-basic" label="Password" variant="standard" type='password' value={passw} onChange={(e) => setPassw(e.target.value)} />
                    {/* <input value={passw} onChange={(e) => setPassw(e.target.value)} type="password" name="Password" placeholder="Password"></input> */}
                    <br /><br />
                    <Button onClick={fn} type="submit" variant="outlined" color='inherit'> Login </Button>
                    <br /><br /><br />
                    Don't have an account??  <Button onClick={() => props.onSwitch('register')} type="submit" variant="outlined" color='inherit'>  Sign Up </Button>
                    <br /><br /><br /><br />
                </div>
            </form>
        </div>
    )
}
