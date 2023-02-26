import { Link } from "react-router-dom";
import React, { useState } from 'react';
import LoginIcon from '@mui/icons-material/Login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StarsIcon from '@mui/icons-material/Stars';
import { AlignHorizontalRight, CatchingPokemon, DiamondTwoTone, Logout, Reddit, StarBorderOutlined, StarBorderPurple500Rounded } from "@mui/icons-material";
import { AppBar, Tooltip, Stack, IconButton, Typography, Toolbar, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fontSize } from "@mui/system";
export const Navbar = () => {
    const navigate = useNavigate()
    const logout = () => {
        localStorage.removeItem("username");
        navigate('/login-register');
    }
    const uname = localStorage.getItem("username")
    let savedurl = `/saved-posts/${uname}`
    return (
        <AppBar position="sticky" color='inherit'>
            <Toolbar>
                <IconButton edge='start' aria-label="logo">
                    <Link to='/' style={{ color: 'black', fontSize: '25px' }}><Reddit fontSize="large" /></Link>
                </IconButton>
                &nbsp;&nbsp;&nbsp;
                <Typography style={{ color: 'black', fontSize: '30px' }} sx={{ flexGrow: 5 }}>
                    GREDDIIT
                </Typography>
                <Stack direction='row' spacing={2}>
                    <Link to='/my-sub-greddiits' style={{ color: 'black', fontSize: '25px' }}>My Sub Greddiits</Link>
                    <Link to='/all-sub-greddiits' style={{ color: 'black', fontSize: '25px' }}>All Sub Greddiits</Link>
                    <Tooltip title='Saved'><Link to={savedurl} style={{ color: 'black', fontSize: '25px' }}><StarsIcon /></Link></Tooltip>
                    <Tooltip title='Profile'><Link to='/profile' style={{ color: 'black', fontSize: '25px' }}><AccountCircleIcon /></Link></Tooltip>
                    <Tooltip title='Logout'><Button onClick={logout} style={{ color: 'black', fontSize: '25px' }}><Logout /></Button></Tooltip>
                </Stack>
            </Toolbar>
        </AppBar>
    )
}