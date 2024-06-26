import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { Navbar } from "./Navbar"
// import React, { useState } from "react";
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded';
import ThumbDownRoundedIcon from '@mui/icons-material/ThumbDownRounded';
import { Login, Logout, Reddit, ThumbDownAltOutlined, ThumbUpAltOutlined, Visibility } from "@mui/icons-material"
// import { AppBar, Button, Card, IconButton, TextField, Toolbar, Tooltip, Typography } from "@mui/material"
// import { Link, useNavigate } from "react-router-dom"
import { Stack } from "@mui/system";
// import { Navbar } from "./Navbar";
import FlagRoundedIcon from '@mui/icons-material/FlagRounded';
import { Link } from "react-router-dom";
import LoginIcon from '@mui/icons-material/Login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StarsIcon from '@mui/icons-material/Stars';
import { AppBar, Tooltip, IconButton, Toolbar, Typography, Button, Card, TextField } from "@mui/material";
import { fontSize } from "@mui/system";
import Modal from '@mui/material/Modal';
import Box from "@mui/material/Box";


export const Report = () => {
    const { id } = useParams()
    const [post, setPost] = useState([]);
    const [name, setName] = useState("");
    const [subgid, setSubgid] = useState("");
    const navigate=useNavigate()
    useEffect(() => {
        getDetails()
    }, [])
    const backurl=`/all-sub-greddiits/${subgid}`

    const getDetails = async () => {
        try {
            // console.log(id)
            const resp = await axios.post("http://localhost:8000/getpost", {
                id: id
            });
            // console.log(resp);
            setPost(resp.data.data);
            // console.log(post);
            setSubgid(resp.data.data.subgrdid);


        } catch (error) {
            console.log("error")
        }
    }

    const Submitted = async () => {
        // console.log(post._id)
        const temp = true;
        const val = localStorage.getItem("username");
        const resp = await axios.post("http://localhost:8000/newreport", {
            subgid: subgid,
            postid: post._id,
            posttext: post.posttext,
            reported_by: val,
            reported_user: post.poster,
            concern: concern,
            visibility: temp
        });
    }

    const [concern, setConcern] = useState("");
    // console.log(post)
    return (
        <div>
            <h1 align="center">The post you reported is: </h1>
            <div style={{ marginLeft: '5%' }}>
                <Card style={{ marginTop: '5%', width: '80%', fontSize: '20px' }}>
                    <div style={{ marginLeft: '2%', display: 'flex' }}>
                        <p>Reported By: {localStorage.getItem("username")} </p>
                        {/* <p style={{ marginLeft: '2rem' }}><Button onClick={() => { Follow(index.poster) }} title='Follow' variant="outlined">Follow</Button></p> */}
                        <p style={{ marginLeft: '1rem' }}>Reported User: {post.poster}</p>
                        {/* <p style={{ marginLeft: '2rem' }}><Button title='Save' variant="outlined" onClick={() => { Saved(index) }} >Save</Button></p> */}
                    </div>
                    <Typography style={{ marginLeft: '2%', width: '80%', border: "solid", height: '6rem' }} multiline rows={4} value={concern} >
                        {post.posttext}
                    </Typography>
                    <div style={{ marginLeft: '2%', display: 'flex' }}>
                        <p>Upvotes: {post.upvotes} <Button><ThumbUpRoundedIcon /></Button></p>
                        <p style={{ marginLeft: '20%' }}>Downvotes: {post.downvotes} <Button> <ThumbDownRoundedIcon /></Button></p>
                        {/* <p style={{ marginLeft: '20%' }}>Report <Button onClick={() => { Report(index._id) }}><FlagRoundedIcon /></Button></p> */}
                        <br />
                    </div>
                </Card>
                <h1>What is your concern regarding this post??</h1>
                <TextField style={{ backgroundColor: "white", width: '60%' }} multiline rows={4} value={concern} onChange={(e) => setConcern(e.target.value)}></TextField>
                <br /><br />
                <Button style={{ marginLeft: "38%" }} type="submit" variant="outlined" color="inherit" onClick={() => {navigate(backurl); Submitted() }}>Submit</Button>
                <br /><br />
            </div>
        </div>
    )
}