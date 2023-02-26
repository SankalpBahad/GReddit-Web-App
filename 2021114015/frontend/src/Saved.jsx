import React, { useEffect, useState } from "react";
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded';
import ThumbDownRoundedIcon from '@mui/icons-material/ThumbDownRounded';
import axios from "axios";
import { Button, Card, Typography } from "@mui/material";
import { Navbar } from "./Navbar";
import { useParams } from "react-router-dom";


export const Saved = () => {
    const [posts, setPosts] = useState([]);
    const getSavedPosts = async () => {
        try {
            const val = localStorage.getItem("username");
            const resp = await axios.post("http://localhost:8000/getsavedposts", { name: val });
            console.log(resp.data);
            setPosts(resp.data);

        } catch (error) {
            console.log("error")
        }
    }

    const Remove = async (e) => {
        const resp = await axios.post("http://localhost:8000/deletefromsaved", { id: e });
    }

    useEffect(() => {
        getSavedPosts()
    }, []);
    return (
        <div>
            <Navbar />

            <div style={{ marginLeft: '5%' }}>
                {
                    posts.map((index) => (
                        <div>
                            <div style={{ marginLeft: '5%' }}>
                                <Card style={{ marginTop: '5%', width: '80%', fontSize: '20px' }}>
                                    <div style={{ marginLeft: '2%', display: 'flex' }}>
                                        <p>Posted By: {index.posted_by}</p>
                                        {/* <p><Tooltip title="Follow"></Tooltip></p> */}
                                        <p style={{ marginLeft: '20%' }}>Posted in: {index.posted_in} </p>
                                        <p style={{ marginLeft: '10%' }}><Button title='Save' variant="outlined" onClick={() => { Remove(index._id) }} >Remove From Saved</Button></p>
                                    </div>
                                    <Typography style={{ marginLeft: '2%', width: '80%', border: "solid", height: '6rem' }} multiline rows={4} >
                                        {index.posttext}
                                    </Typography>
                                    <div style={{ marginLeft: '2%', display: 'flex' }}>
                                        <p>Upvotes: {index.upvotes} <Button><ThumbUpRoundedIcon /></Button></p>
                                        <p style={{ marginLeft: '20%' }}>Downvotes: {index.downvotes} <Button><ThumbDownRoundedIcon /></Button></p>
                                        {/* <p style={{ marginLeft: '20%' }} onClick={()=>{Report(index._id)}}>Report <Button><FlagRoundedIcon /></Button></p> */}
                                    </div>
                                    <div style={{ marginLeft: "2%" }}>
                                        <h5>Comments:</h5>
                                        {
                                            (index.comments).map((iter) => (
                                                <p style={{ marginLeft: "2%" }}>{iter.user}:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{iter.matter}</p>
                                            ))
                                        }
                                    </div>
                                    <br />
                                </Card>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

