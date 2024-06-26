import { AddBox, HdrPlus, PlusOneTwoTone, Report } from "@mui/icons-material"
import { AppBar, Tooltip, IconButton, Toolbar, Typography, Button, Card, TextField } from "@mui/material";
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Link } from "react-router-dom";
import { Navbar } from "./Navbar"
import FlagRoundedIcon from '@mui/icons-material/FlagRounded';
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded';
import ThumbDownRoundedIcon from '@mui/icons-material/ThumbDownRounded';
import { Reddit, Logout } from "@mui/icons-material"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StarsIcon from '@mui/icons-material/Stars';
import { Stack } from "@mui/system";



export const InMySubGrd = () => {

    const [newpost, setNewpost] = useState("")
    const [posts, setPosts] = useState([])
    const val = localStorage.getItem("username")
    const [subgrd, setSubgrd] = useState([])

    const getsubgrd = async () => {
        // console.log("error here")
        try {
            const resp = await axios.post("http://localhost:8000/getsubgrddata", {
                id: id
            })
            setSubgrd(resp.data)
            // console.log(resp.data)
        }
        catch (error) {
            console.log(error)
        }
    }

    const Submitted = async () => {
        // console.log(newpost)
        const resp = await axios.post("http://localhost:8000/newpost", {
            poster: val,
            subgrdid: id,
            posttext: newpost,
            upvotes: 0,
            downvotes: 0
        })

    }

    const { id } = useParams();


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
        getDetails()
    }, []);
    const navigate = useNavigate()
    const urname=localStorage.getItem("username")
    let joinrequrl = `/joiningreqs/${id}`
    let usersurl = `/users/${id}`
    let statsurl = `/stats/${id}`
    let reporturl = `/reportpage/${id}`
    let savedurl = `/saved-posts/${urname}`

    const logout = () => {
        localStorage.removeItem("username");
        navigate('/login-register');
    }

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

    return (
        <div>
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
                        <Link to={usersurl} style={{ color: 'black', fontSize: '25px' }}>Users</Link>
                        <Link to={joinrequrl} style={{ color: 'black', fontSize: '25px' }}>Join Requests</Link>
                        <Link to={statsurl} style={{ color: 'black', fontSize: '25px' }}>Stats</Link>
                        <Link to={reporturl} style={{ color: 'black', fontSize: '25px' }}>Reports</Link>
                        <Link to='/my-sub-greddiits' style={{ color: 'black', fontSize: '25px' }}>My Sub Greddiits</Link>
                        <Link to='/all-sub-greddiits' style={{ color: 'black', fontSize: '25px' }}>All Sub Greddiits</Link>
                        <Tooltip title='Saved'><Link to={savedurl} style={{ color: 'black', fontSize: '25px' }}><StarsIcon /></Link></Tooltip>
                        <Tooltip title='Profile'><Link to='/profile' style={{ color: 'black', fontSize: '25px' }}><AccountCircleIcon /></Link></Tooltip>
                        <Tooltip title='Logout'><Button onClick={logout} style={{ color: 'black', fontSize: '25px' }}><Logout /></Button></Tooltip>
                    </Stack>
                </Toolbar>
            </AppBar>
        </div>
    )

}