import { Button, Card, CardContent, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Navbar } from "./Navbar"
import axios from "axios"
// import React, { useState } from "react";
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded';
import ThumbDownRoundedIcon from '@mui/icons-material/ThumbDownRounded';
import { Login, Logout, Reddit, Sort } from "@mui/icons-material"
// import { AppBar, Button, Card, IconButton, TextField, Toolbar, Tooltip, Typography } from "@mui/material"
// import { Link, useNavigate } from "react-router-dom"
import { Stack } from "@mui/system";
// import { Navbar } from "./Navbar";
import FlagRoundedIcon from '@mui/icons-material/FlagRounded';
import { Link } from "react-router-dom";
import LoginIcon from '@mui/icons-material/Login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StarsIcon from '@mui/icons-material/Stars';
import { AppBar, Tooltip, IconButton, Toolbar } from "@mui/material";
import { fontSize } from "@mui/system";
import Fuse from 'fuse.js';
import { create, sumBy } from "lodash"
const _ = require("lodash")

export const AllSubGrd = () => {
    const navigate = useNavigate();
    const [subgs, setSubgs] = useState([]);
    const [creator, setCreator] = useState("");
    const val = localStorage.getItem("username");
    let test = false;
    let test2 = false;
    if (val !== creator) {
        test = true;
    }
    const getDetails = async () => {
        // console.log(val);
        const resp = await axios.post("http://localhost:8000/getallsubgs");
        // console.log(resp);
        setSubgs(resp.data);
        // console.log(subgs);
    }
    useEffect(() => {
        getDetails()
        reordersubgs()
    }, []);


    // console.log("reorder")
    // console.log(subgs.length)
    const [reordered, setReordered] = useState([]);
    const reordersubgs = () => {

        // console.log("first")
        // for (let i = 0; i < subgs.length; i++) {
        //     if (subgs[i].creator === localStorage.getItem("username"))
        //     {
        // console.log(subgs[i])
        //         const updated=[...reordered, subgs[i]];
        //         setReordered(updated);
        //     }       
        // }

        subgs.forEach((subg) => {
            if (subg.creator === localStorage.getItem("username")) {
                const update = { ...subg }
                reordered.push(update)
            }
        })
        // showreordered();
        // console.log("second")
        subgs.forEach((subg) => {
            if (subg.nonblocked.includes(localStorage.getItem("username"))) {
                const update = { ...subg }
                reordered.push(update)
            }
        })
        subgs.forEach((subg) => {
            if (subg.creator !== localStorage.getItem("username") && !subg.nonblocked.includes(localStorage.getItem("username"))) {
                const update = { ...subg }
                reordered.push(update)
            }
            // console.log(subg)
        })
        setSubgs(reordered)
        console.log("reordered")
        // console.log("third")
        // subgs.forEach((subg)=>{
        //     if(reordered.includes(subg)){
        //         // const update={...subg}
        //         // reordered.push(update)
        // console.log("this");
        //     }
        // })
        // showreordered();
        // for (let i = 0; i < subgs.length; i++) {
        //     if (subgs[i].nonblocked.includes(localStorage.getItem("username")))
        //     {
        // console.log(subgs[i])
        //         setReordered(reordered.concat(subgs[i]));
        //     }
        // }
        // console.log("third")
        // for (let i = 0; i < subgs.length; i++) {
        //     if (reordered.notincludes(subgs[i]))
        //     {
        // console.log(subgs[i])
        //         setReordered(reordered.concat(subgs[i]));
        //     }
        // }
        // console.log("final")
        // console.log(reordered)

    }
    // if (subgs.length !== 0) {
    //     reordersubgs()
    // }
    // const showreordered = () => {
    //     console.log("subgs", subgs)
    //     console.log("reordered", reordered)

    // }

    // const CheckUser = () => {

    // }

    const Join = async (e1) => {
        const resp = await axios.post("http://localhost:8000/joinrequest", {
            id: e1,
            user: val
        })
        alert(resp.data)
    }

    const Leave = async (e) => {
        const resp = await axios.post("http://localhost:8000/leave", {
            id: e,
            user: val
        })
        alert(resp.data)
    }

    const [search, setSearch] = useState("")

    const Enter = (e) => {
        // setId(e);
        // console.log(e);
        let navurl = `/all-sub-greddiits/${e}`
        navigate(navurl);
        // console.log(navurl)
    }
    const [followerstest, setFollowerstest] = useState(false);
    const [nametest, setNametest] = useState(false);
    const [createdate, setCreatedate] = useState(false);
    const [ascending, setAscending] = useState(false);
    const [descending, setDescending] = useState(false);
    const [sort, setSort] = useState(true);


    const options = {
        keys: ['subgrdname'],
        includeScore: true,
        threshold: 0.4,
    };

    // const fuse = new Fuse(subgs, options);

    return (
        <div>
            <Navbar />
            <br /><br />
            <p align="center" style={{ fontSize: '1.5rem', fontcolor: "white" }}>Search:&nbsp;<TextField color="info" size="small" variant="outlined" style={{ backgroundColor: "white", fontSize: "2rem" }} index={search} onChange={(e) => { setSearch(e.target.value) }}></TextField></p>
            <br /><br />
            <p align="center" >Sort By: &nbsp;&nbsp;&nbsp;&nbsp; <Button onClick={() => { setSort(true); setFollowerstest(true); setNametest(false); setAscending(true); setDescending(false) }}>Followers</Button>&nbsp;&nbsp;&nbsp;&nbsp;<Button onClick={() => { setSort(true); setAscending(true); setDescending(false); setFollowerstest(false); setNametest(true) }}>Name (Ascending)</Button>&nbsp;&nbsp;&nbsp;&nbsp;<Button onClick={() => { setSort(true); setDescending(true); setAscending(false); setFollowerstest(false); setNametest(true) }}>Name(Descending)</Button>&nbsp;&nbsp;&nbsp;&nbsp;<Button onClick={() => { setSort(true); setFollowerstest(false); setNametest(false); }}>Creation Date</Button>&nbsp;&nbsp;&nbsp;&nbsp;<Button onClick={() => { setSort(false) }}>None</Button></p>
            <br /><br />
            {sort?
                <div align="center">
                {

                    _.orderBy(subgs, [(followerstest ? 'followers' : nametest ? 'subgrdname' : '')], [(descending ? 'asc' : 'desc')]).filter((index) => {
                        if (search == "") {
                            return index
                        }
                        else if (index.subgrdname.toLowerCase().includes(search.toLowerCase())) {
                            return index
                        }
                    }).reverse().map((index, key) => {
                        return (
                            <div align="left" style={{ width: '40%' }} key={index.subgrdname} followers={index.followers} name={index.subgrdname.toLowerCase()}>
                                <Card>
                                    <CardContent style={{ marginLeft: '5%', marginTop: '2%' }}>
                                        <Typography variant="h5">
                                            {index.subgrdname}
                                        </Typography>
                                        <br /><br />
                                        <Typography>
                                            Number of People: {index.followers}
                                        </Typography>
                                        <br />
                                        <Typography>
                                            Number of Posts: {index.posts}
                                        </Typography>
                                        <br />
                                        <Typography>
                                            Tags: {index.tags}
                                        </Typography>
                                        <br />
                                        <Typography>
                                            Banned Keywords: {index.bannedkeys}
                                        </Typography>
                                        <br />
                                        <Typography>
                                            Description: {index.subgrddesc}
                                        </Typography>
                                        <br />
                                        {(index.nonblocked).includes(val) || index.creator === val ? <Button type="submit" style={{ marginLeft: '26%' }} onClick={() => { Enter(index._id) }}>Enter</Button> : <Button type="submit" style={{ marginLeft: '26%' }} onClick={() => { Join(index._id) }}>Join</Button>}
                                        {(index.nonblocked).includes(val) && index.creator !== val ? <Button style={{ marginLeft: '18%' }} onClick={() => { Leave(index._id) }}>Leave</Button> : <div></div>}
                                    </CardContent>
                                </Card>
                                <br /> <br />
                            </div>
                        );
                    })
                }
            </div>:
            <div align="center">
                {

                    subgs.map((index, key) => {
                        return (
                            <div align="left" style={{ width: '40%' }} key={index.subgrdname} followers={index.followers} name={index.subgrdname.toLowerCase()}>
                                <Card>
                                    <CardContent style={{ marginLeft: '5%', marginTop: '2%' }}>
                                        <Typography variant="h5">
                                            {index.subgrdname}
                                        </Typography>
                                        <br /><br />
                                        <Typography>
                                            Number of People: {index.followers}
                                        </Typography>
                                        <br />
                                        <Typography>
                                            Number of Posts: {index.posts}
                                        </Typography>
                                        <br />
                                        <Typography>
                                            Tags: {index.tags}
                                        </Typography>
                                        <br />
                                        <Typography>
                                            Banned Keywords: {index.bannedkeys}
                                        </Typography>
                                        <br />
                                        <Typography>
                                            Description: {index.subgrddesc}
                                        </Typography>
                                        <br />
                                        {(index.nonblocked).includes(val) || index.creator === val ? <Button type="submit" style={{ marginLeft: '26%' }} onClick={() => { Enter(index._id) }}>Enter</Button> : <Button type="submit" style={{ marginLeft: '26%' }} onClick={() => { Join(index._id) }}>Join</Button>}
                                        {(index.nonblocked).includes(val) && index.creator !== val ? <Button style={{ marginLeft: '18%' }} onClick={() => { Leave(index._id) }}>Leave</Button> : <div></div>}
                                    </CardContent>
                                </Card>
                                <br /> <br />
                            </div>
                        );
                    })
                }
            </div>}
        </div>
    )
}
