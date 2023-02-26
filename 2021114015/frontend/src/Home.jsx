// import { Reddit } from "@mui/icons-material"
// import { AppBar, Card, IconButton, Toolbar, Typography } from "@mui/material"
// import { Link } from "react-router-dom"
import React, { useEffect } from "react";
import { Login, Logout, Reddit } from "@mui/icons-material"
import { AppBar, Button, Card, IconButton, Toolbar, Tooltip, Typography } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import { Stack } from "@mui/system";
import { Navbar } from "./Navbar";

export const Home = () => {
    const navigate = useNavigate();
    const checklogin = () => {
        if (localStorage.getItem("username") === null) {
            console.log("Not logged in")
            navigate("/login-register");
            // alert("Please Login to continue");
        }
    }

    useEffect(()=>{
        checklogin()
    },[])
    // const navigate=useNavigate();
    // let test = false;
    // if (localStorage.getItem("username") == "") {
    //     test = true;
    // }
    // const logout = () => {
    //     localStorage.removeItem("username");
    //     navigate('/login-register');
    // }

    // const login = () => {
    //     navigate('/login-register');
    // }
    return (
        <div>
            {/* <AppBar position="sticky" color='inherit'>
                <Toolbar>
                    <IconButton edge='start' aria-label="logo">
                        <Link to='/home' style={{ color: 'black', fontSize: '25px' }}><Reddit fontSize="large" /></Link>
                    </IconButton>
                    &nbsp;&nbsp;&nbsp;
                    <Typography style={{ color: 'black', fontSize: '30px' }} sx={{ flexGrow: 5 }}>
                        GREDDIIT
                    </Typography>
                    <Stack direction='row' spacing={2}>
                        <Tooltip title='Saved'><Link to='/saved-posts' style={{ color: 'black', fontSize: '25px' }}></Link></Tooltip>
                        <Tooltip title='Profile'><Link to='/profile' style={{ color: 'black', fontSize: '25px' }}></Link></Tooltip>
                        {test ? <Tooltip title='Login'><Button onClick={login} style={{ color: 'black', fontSize: '25px' }}><Login /></Button></Tooltip>:<Tooltip title='Logout'><Button onClick={logout} style={{ color: 'black', fontSize: '25px' }}><Logout /></Button></Tooltip>}
                    </Stack>
                </Toolbar>
            </AppBar> */}
            <Navbar />
            <div align="center" style={{ marginTop: "5%" }}>
                <p style={{ fontSize: "5rem" }}>Welcome to GREDDIIT</p>
                <p style={{ fontSize: "2rem" }}>Go to <u>All Sub Greddiits</u> to view all the sub greddiits</p>
                <p style={{ fontSize: "2rem" }}>Go to <u>My Sub Greddiits</u> to view your the sub greddiits</p>
                <p style={{ fontSize: "2rem" }}>Go to <u>Saved Page</u> to view the posts saved by you</p>
                <p style={{ fontSize: "2rem" }}>Go to <u>Profile page</u> to view and edit your profile</p>
                <p style={{ fontSize: "2rem" }}>Click the <u>Logout Button</u> to log out from your account</p>
            </div>
        </div>
    )
}