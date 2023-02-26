import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Navbar } from "./Navbar"
import axios from "axios"
// import React, { useState } from "react";
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded';
import ThumbDownRoundedIcon from '@mui/icons-material/ThumbDownRounded';
import { Login, Logout, Reddit, ThumbDownAltOutlined, ThumbUpAltOutlined } from "@mui/icons-material"
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



export const InAllSubGrd = () => {

    const [newpost, setNewpost] = useState("")
    const [posts, setPosts] = useState([])
    const val = localStorage.getItem("username")
    const [subgrd, setSubgrd] = useState([])
    const [name, setName] = useState("")
    const [bannedkeys, setBannedkeys] = useState([])

    const getsubgrd = async () => {
        const resp = await axios.post("http://localhost:8000/getsubgrddata", {
            id: id
        })
        setSubgrd(resp.data.data)
        // console.log(resp.data.data)
        setName(subgrd.subgrdname)
    }
    const Setbanned = () => {
        setBannedkeys((subgrd.bannedkeys + ',').split(','))
        // console.log()
    }
    // console.log(subgrd);
    const Submitted = async () => {
        console.log(bannedkeys)
        // console.log(newpost)
        var elem = bannedkeys.pop()
        // console.log(bannedkeys)
        const npost = bannedkeys.reduce((str, word) => {
            const regex = new RegExp(word, "gi");
            return str.replace(regex, "***");
        }, newpost)
        // console.log(npost)
        // if(bannedalert){alert("Your post has banned keywords")}
        const resp = await axios.post("http://localhost:8000/newpost", {
            poster: val,
            subgrdid: id,
            subgrdname: name,
            posttext: npost,
            upvotes: 0,
            downvotes: 0
        })
    }

    const { id } = useParams();
    const uname = localStorage.getItem("username")
    let joinrequrl = `/joiningreqs/${id}`
    let usersurl = `/users/${id}`
    let statsurl = `/stats/${id}`
    let savedurl = `/saved-posts/${uname}`


    const getDetails = async () => {
        try {
            // console.log(id)
            const resp = await axios.post("http://localhost:8000/getallposts", {
                id: id
            });
            // console.log(resp);
            setPosts(resp.data);
            // console.log(resp.data);


        } catch (error) {
            console.log("error")
        }
    }
    useEffect(() => {
        getsubgrd()
        Setbanned()
        getDetails()
    }, []);

    useEffect(() => {
    }, [bannedkeys])


    // console.log(id);
    //     const Report = async (e) => {
    //         const id=e;
    //         try{
    // const resp=await axios.post("http://localhost:8000/report",{
    //     postid: id,
    //     reported_by:
    // })
    //         }
    //         catch(err){
    //             console.log(err)
    //         }
    //     }
    const navigate = useNavigate()
    const logout = () => {
        localStorage.removeItem("username");
        navigate('/login-register');
    }
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [report, setReport] = useState([]);
    const Saved = async (e1,e2,e3,e4,e5, name) => {
        const val = localStorage.getItem("username");
        // console.log(name);
        const resp = await axios.post("http://localhost:8000/savedposts", {
            user: val,
            posted_by:e1,
            posted_in:name,
            posttext:e2,
            upvotes:e3,
            downvotes:e4,
            comments:e5,
        })
    }
    const [bannedalert, setBannedalert] = useState(false)
    const [test, setTest] = useState();
    let newpostopt = false;
    const [upvote, setUpvote] = useState(false);
    const [downvote, setDownvote] = useState(false);
    const Report = async (e) => {
        let newurl = `/report/${e}`;
        navigate(newurl)
    }

    const Follow = async (e) => {
        const val = localStorage.getItem("username");
        if (e === localStorage.getItem("username")) {
            alert("You can't follow yourself")
        }
        else {
            console.log(e);
            const resp = await axios.post("http://localhost:8000/follow", {
                username: val,
                poster: e
            });
            alert(resp.data)
        }
    }

    const Upvoted = async (e) => {
        const resp = await axios.post("http://localhost:8000/upvote", { e: e })
    }
    const Downvoted = async (e) => {
        // console.log(e)
        const resp = await axios.post("http://localhost:8000/downvote", { e: e })
    }
    const [commentdata, setCommentdata] = useState([])
    const [comment, setComment] = useState("")

    const Addcomment = async (e) => {
        const resp = await axios.post("http://localhost:8000/addcomment", { id: e, comment: comment, commenter: val })
    }

    return (
        <div>
            <Navbar />
            <div style={{ display: "flex" }}>
                <div style={{ position: "fixed", width: "20%" }} >
                    <br /><br /><br />
                    <img src="https://th.bing.com/th/id/OIP.CCjFM8OYuKm_CmGOntI_5QHaEK?pid=ImgDet&rs=1" />
                    <br /><br />
                    <h1>Name: {subgrd.subgrdname}</h1>
                    <br />
                    <h1>Description: {subgrd.subgrddesc}</h1>
                    <br /><br />
                    {/* <Card style={{ marginTop: '5%', width: '150%', fontSize: '20px' }}>
                        <div style={{ marginLeft: '2%', display: 'flex' }}>
                            New Post:
                        </div>
                        <br />
                        <TextField style={{ marginLeft: '2%', width: '80%' }} multiline rows={4} value={newpost} onChange={(e) => setNewpost(e.target.value)}>
                        </TextField>
                        <br /> <br />
                        <Button type="submit" onClick={Submitted}>Submit</Button>
                        <br /> <br />
                    </Card> */}
                </div>
                <div style={{ marginLeft: "35%" }}>
                    <br /><br /><br />
                    <Button align="center" style={{ marginLeft: "48%", marginTop: "3%" }} variant="contained" onClick={handleOpen}>Add New Post</Button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <div style={{ color: "black" }}>
                            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: "white", border: '2px solid #000', boxShadow: 24, p: 4, }}>
                                <Typography id="modal-modal-description" variant="h6" component="h2">
                                    New Post
                                </Typography>
                                <br />
                                <TextField style={{ marginLeft: '2%', width: '100%' }} multiline rows={4} value={newpost} onChange={(e) => setNewpost(e.target.value)}></TextField>
                                <br /><br />
                                <Button style={{ marginLeft: "38%" }} type="submit" onClick={Submitted}>Submit</Button>
                            </Box>
                        </div>
                    </Modal>
                    <br /><br /><br />
                    <div style={{ marginLeft: '5%' }}>
                        {
                            posts.map((index, key) => (
                                <div>
                                    <div style={{ marginLeft: '5%' }}>
                                        <Card style={{ marginTop: '5%', width: '120%', fontSize: '20px' }}>
                                            <div style={{ marginLeft: '2%', display: 'flex' }}>
                                                <p>Posted By: {index.poster}</p>
                                                <p style={{ marginLeft: '2rem' }}><Button onClick={() => { Follow(index.poster) }} title='Follow' variant="outlined">Follow</Button></p>
                                                <p style={{ marginLeft: '1rem' }}>Posted In: {subgrd.subgrdname}</p>
                                                <p style={{ marginLeft: '2rem' }}><Button title='Save' variant="outlined" onClick={() => { Saved(index.poster,index.posttext,index.upvotes,index.downvotes,index.comments, subgrd.subgrdname) }} >Save</Button></p>
                                            </div>
                                            <Typography style={{ marginLeft: '2%', width: '80%', border: "solid", height: '6rem' }} multiline rows={4} >
                                                {
                                                    index.posttext
                                                }
                                            </Typography>
                                            <div style={{ marginLeft: '2%', display: 'flex' }}>
                                                <p>Upvotes: {index.upvotes} <Button onClick={() => { setUpvote(true); Upvoted(index._id) }} ><ThumbUpRoundedIcon /></Button></p>
                                                <p style={{ marginLeft: '20%' }}>Downvotes: {index.downvotes} <Button onClick={() => { setDownvote(true); Downvoted(index._id) }}> <ThumbDownRoundedIcon /></Button></p>
                                                <p style={{ marginLeft: '20%' }}>Report <Button onClick={() => { Report(index._id) }}><FlagRoundedIcon /></Button></p>
                                                <br />
                                            </div>
                                            <div style={{ marginLeft: "2%" }}>
                                                <h5>Comments:</h5>
                                                {
                                                    (index.comments).map((iter, key) => (
                                                        <p style={{ marginLeft: "2%" }} >{iter.user}:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{iter.matter}</p>
                                                    ))
                                                }
                                            </div>
                                            <br />
                                            <p style={{ marginLeft: "1%" }} key={index._id}>Add Comment<TextField style={{ width: "90%" }} value={comment} onChange={(e) => setComment(e.target.value)} /><Button style={{ marginLeft: "38%" }} type="submit" onClick={() => { Addcomment(index._id) }}>Submit</Button></p>
                                        </Card>
                                        <br /><br />
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )

}