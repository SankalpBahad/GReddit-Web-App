import { AlignHorizontalCenterRounded } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
export const Register = (props) => {

    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [uname, setUname] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [cno, setCno] = useState('');
    const [passw, setPassw] = useState('');

    // const Savetodatabase=()=>{
    //     axios.post("/register",{
    //         first_name:fname,
    //         last_name:lname,
    //         username:uname,
    //         email:email,
    //         password:passw
    //     })
    // }
    // axios({
    //     method:'POST',
    //     url:'http://localhost:8000/register
    // }).then((response)=>{
    //     setEmail(response.data)
    // }).catch((error)=>console.error(error))

    const Submit = async () => {
        if (fname == "" || lname == "" || uname == "" || passw == "" || email == "") {
            alert("Fill all fields")
        }
        else {
            props.onSwitch('login')
            const val = await axios.post('http://localhost:8000/register', {
                first_name: fname,
                last_name: lname,
                user_name: uname,
                email: email,
                contactnumber: cno,
                age: age,
                password: passw
            })
                .then(res => console.log("Success"))
        }
    }
    // const navigate = useNavigate();
    return (
        <div align="center">
            <br />
            <form className='form' style={{
                color: 'black',
                backgroundColor: 'white',
                width: 470,
                height: 620
            }}>
                <br />
                <td style={{ fontSize: '20px' }}>&nbsp;&nbsp;Login&nbsp;&nbsp;</td><td style={{ fontSize: '50px' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Register</td>
                <p>-----------------------------------------------------------</p>
                <TextField id="standard-basic" type="text" label="First Name" variant="standard" required="true" value={fname} onChange={(e) => setFname(e.target.value)} />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <TextField id="standard-basic" type="text" label="Last Name" variant="standard" required="true" value={lname} onChange={(e) => setLname(e.target.value)} />
                <br />&nbsp;<br />
                <TextField id="standard-basic" type="text" label="User Name" variant="standard" required="true" value={uname} onChange={(e) => setUname(e.target.value)} />
                <br />&nbsp;<br />
                <TextField id="standard-basic" label="Email" variant="standard" type='email' required="true" value={email} onChange={(e) => setEmail(e.target.value)} />
                <br />&nbsp;<br />
                <TextField id="standard-basic" type="tel" label="Contact Number" variant="standard" value={cno} onChange={(e) => setCno(e.target.value)} />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <TextField id="standard-basic" type="number" label="Age" variant="standard" value={age} onChange={(e) => setAge(e.target.value)} />
                <br />&nbsp;<br />
                <TextField id="standard-basic" label="Password" variant="standard" type='password' required="true" value={passw} onChange={(e) => setPassw(e.target.value)} />
                <br />&nbsp;<br />
                <Button onClick={Submit} type="submit" variant="outlined" color='inherit' > Sign Up </Button>
                {/* <Button onClick={() => props.onSwitch('login')} type="submit" variant="outlined" color='inherit' > Sign Up </Button> */}
                <br />&nbsp;<br />
                Already have an account? &nbsp;&nbsp;<Button onClick={() => props.onSwitch('login')} type="submit" variant="outlined" color='inherit'> Log In </Button><br />
            </form>
        </div>
    )
}