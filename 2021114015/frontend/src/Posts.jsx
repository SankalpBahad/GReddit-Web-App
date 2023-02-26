import React, { useEffect, useState } from "react";
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded';
import ThumbDownRoundedIcon from '@mui/icons-material/ThumbDownRounded';
import { Login, Logout, Reddit } from "@mui/icons-material"
import { AppBar, Button, Card, IconButton, TextField, Toolbar, Tooltip, Typography } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import { Stack } from "@mui/system";
import { Navbar } from "./Navbar";
import FlagRoundedIcon from '@mui/icons-material/FlagRounded';
import axios from "axios";

export const Posts = () => {
    const [poster, setPoster] = useState("")
    const [subgrd, setSubgrd] = useState("")
    const [upvotes, setUpvotes] = useState()
    const [downvotes, setDownvotes] = useState()
    const [posts, setPosts] = useState()
    const navigate = useNavigate();
    let test = false;
    if (localStorage.getItem("username") == "") {
        test = true;
    }
    const logout = () => {
        localStorage.removeItem("username");
        navigate('/');
    }

    const login = () => {
        navigate('/');
    }

    const getDetails = async () => {
        try {

            // console.log(val);
            const resp = await axios.post("http://localhost:8000/getallposts",);
            // console.log(resp);
            setPosts(resp.data);
            // console.log(subgs);

        } catch (error) {
            console.log("error")
        }
    }
    useEffect(() => {
        getDetails()
    }, []);

    
    return (
        <div>
            <Navbar />
            <div style={{ marginLeft: '5%' }}>

                <Card style={{ marginTop: '5%', width: '65%', fontSize: '20px' }}>
                    <div style={{ marginLeft: '2%', display: 'flex' }}>
                        <p>Posted By {poster} </p>
                        <p style={{ marginLeft: '40%' }}>Posted In {subgrd}</p>
                    </div>
                    <TextField style={{ marginLeft: '2%', width: '80%' }} multiline rows={4} >
                    </TextField>
                    <br /> <br /> <br />
                    <div style={{ marginLeft: '2%', display: 'flex' }}>
                        <p>Upvote: <Button><ThumbUpRoundedIcon /></Button>{upvotes}</p>
                        <p style={{ marginLeft: '20%' }}>Downvote: <Button><ThumbDownRoundedIcon /></Button>{downvotes}</p>
                        {/* <p style={{ marginLeft: '20%' }} onClick={() => { Report }}>Report <Button><FlagRoundedIcon /></Button></p> */}
                    </div>
                </Card>
            </div>
        </div>
    )
}