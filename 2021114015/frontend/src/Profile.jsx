import * as React from 'react';
import { Alert, Button, List, ListItem, TextField } from "@mui/material";
import { fontSize } from "@mui/system";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";
import DeleteIcon from '@mui/icons-material/Delete';
// import { useState } from "react";
import axios from 'axios';
import ListItemIcon from '@mui/material/ListItemIcon';
import FolderIcon from '@mui/icons-material/Folder';
import ListItemText from '@mui/material/ListItemText';
import { useEffect } from 'react';

export const Profile = () => {

    const navigate = useNavigate();
    const [id, setId] = useState("");
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [uname, setUname] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [cno, setCno] = useState('');
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);

    const [editfname, setEditfname] = useState(false);
    const [editlname, setEditlname] = useState(false);
    const [edituname, setEdituname] = useState(false);
    const [editage, setEditAge] = useState(false);
    const [editcno, setEditcno] = useState(false);
    // const x = localStorage.getItem("username");
    // console.log(x)
    const getUname = async () => {
        try {
            const val = localStorage.getItem("username");
            // console.log(val);
            const resp = await axios.post("http://localhost:8000/getuserdata", {
                val: val
            });
            // console.log(resp.data.details)
            setId(resp.data.details._id)
            setLname(resp.data.details.last_name)
            setFname(resp.data.details.first_name)
            setUname(resp.data.details.user_name)
            setAge(resp.data.details.age)
            setCno(resp.data.details.contactnumber)
            setEmail(resp.data.details.email)
            setFollowers(resp.data.details.followers)
            setFollowing(resp.data.details.following)
            // setUname(resp.data.details);
            // console.log(followers)
            // console.log(following)
        } catch (error) {
            console.log("error")
        }
    }
    useEffect(() => {
        getUname()
    }, []);
    // if (localStorage.getItem("username") != "admin" || localStorage.getItem("password") != "admin") {
    //     alert("Please Login to Continue")
    //     window.location.href = ('/login-register');
    // }
    // const getData = async () => {
    //     try {
    //         const resp = await axios.get("http://localhost:8000/profile");
    //         console.log("resp.data")
    //     } catch (error) {
    //         console.log("error")
    //     }
    // }
    // useEffect(() => {
    //     getData()
    // }, []);

    const SaveChanges = async (e) => {
        localStorage.setItem("username", uname)
        const resp = await axios.post("http://localhost:8000/update", {
            fname: fname,
            lname: lname,
            uname: uname,
            cno: cno,
            age: age,
            id: e
        })
        console.log(resp.data)
        alert(resp.data)
    }

    const Removefollower = async (e) => {
        const usrname = uname
        const resp = await axios.post("http://localhost:8000/removefollower", { usrname: usrname, target: e })

    }

    const Removefollowing = async (e) => {
        const usrname = uname
        const resp = await axios.post("http://localhost:8000/stopfollowing", { usrname: usrname, target: e })
    }

    const [followersval, setFollowersval] = useState(0);
    const [followingval, setFollowingval] = useState(0);
    return (
        <div >
            <Navbar />
            <p className='header' style={{ fontSize: '2.5rem' }} >
                Welcome to your Profile Page!!
            </p>
            <br />
            <div style={{ display: "flex" }}>
                <div className="prof-table" style={{ width: '60%', backgroundColor: 'lightyellow', color: 'black', marginLeft: '1%' }} >

                    <div style={{ display: 'flex', marginLeft: '1%', marginTop: '1%' }}>
                        <td >First Name</td>
                        {editfname ? <TextField style={{ marginLeft: '7.4%' }} size="small" value={fname} onChange={(e) => setFname(e.target.value)} ></TextField> : <td style={{ marginLeft: '7.4%' }}>{fname} </td>}
                        <br />
                    </div>
                    <br />
                    <div style={{ display: 'flex', marginLeft: '1%' }}>
                        <td >Last Name</td>
                        {/* <td style={{ marginLeft: '7.5%' }}>{lname} </td> */}
                        {editlname ? <TextField style={{ marginLeft: '7.5%' }} size="small" value={lname} onChange={(e) => setLname(e.target.value)}></TextField> : <td style={{ marginLeft: '7.4%' }}>{lname} </td>}
                        <br />
                    </div>
                    <br />
                    <div style={{ display: 'flex', marginLeft: '1%' }}>
                        <td >User Name</td>
                        {/* <td style={{ marginLeft: '7.25%' }}>{uname} </td> */}
                        {edituname ? <TextField style={{ marginLeft: '7.25%' }} size="small" value={uname} onChange={(e) => setUname(e.target.value)}></TextField> : <td style={{ marginLeft: '7.4%' }}>{uname} </td>}
                        <br />
                    </div>
                    <br />
                    <div style={{ display: 'flex', marginLeft: '1%' }}>
                        <td >Contact Number</td>
                        {/* <td style={{ marginLeft: '4.5%' }}>{cno} </td> */}
                        {editcno ? <TextField style={{ marginLeft: '4.5%' }} size="small" value={cno} onChange={(e) => setCno(e.target.value)}></TextField> : <td style={{ marginLeft: '7.4%' }}>{cno} </td>}
                        <br />
                    </div>
                    <br />
                    <div style={{ display: 'flex', marginLeft: '1%' }}>
                        <td >Age</td>
                        {/* <td style={{ marginLeft: '11%' }}>{age} </td> */}
                        {editage ? <TextField style={{ marginLeft: '11%' }} size="small" value={age} onChange={(e) => setAge(e.target.value)}></TextField> : <td style={{ marginLeft: '7.4%' }}>{age} </td>}
                        <br />
                    </div>
                    <br />
                    <div style={{ display: 'flex', marginLeft: '1%' }}>
                        <td >Email ID</td>
                        <td style={{ marginLeft: '9%' }}>{email} </td>
                        <br />
                    </div>
                    <br />
                    <br />

                    <div style={{ display: "flex" }}>
                        <div style={{ marginLeft: "1%", fontSize: "30px" }}>
                            Followers: <Button variant="outlined" color="inherit" onClick={() => { if (followersval === 1) { setFollowersval(0) } else { setFollowersval(1) } }} >{followers.length}</Button>
                            <br /><br />
                            {followersval ?
                                <div>
                                    {
                                        followers.map((index) => (
                                            <div style={{ marginLeft: "5%" }}>
                                                <td style={{ fontSize: "1.5rem" }}>{index}</td>
                                                <td><Button style={{ marginLeft: '60%' }} variant="text" onClick={() => { Removefollower(index) }}><DeleteIcon /></Button></td>
                                            </div>
                                        ))
                                    }
                                    <br />
                                </div> :
                                <div>

                                </div>
                            }
                        </div>
                        <div style={{ marginLeft: "40%", fontSize: "30px" }}>
                            Following:  <Button variant="outlined" color="inherit" onClick={() => { if (followingval === 1) { setFollowingval(0) } else { setFollowingval(1) } }}>{following.length}</Button>
                            {followingval ?
                                <div>
                                    {
                                        following.map((index) => (
                                            <div style={{ marginLeft: "5%" }}>
                                                <td style={{ fontSize: "1.5rem" }}>{index}</td>
                                                <td><Button style={{ marginLeft: '60%' }} variant="text" onClick={() => { Removefollowing(index) }}><DeleteIcon /></Button></td>
                                            </div>
                                        ))
                                    }
                                </div> :
                                <div></div>
                            }
                            <br />
                        </div>
                    </div>
                </div>
                <div >
                    <Button style={{ width: '100%', backgroundColor: 'lightyellow', color: 'black', marginLeft: '1%' }} onClick={() => { if (editfname) { setEditfname(false) } else { setEditfname(true) } }} type="submit" variant='contained' color='inherit'>Edit First Name</Button>
                    <br /><br />
                    <Button style={{ width: '100%', backgroundColor: 'lightyellow', color: 'black', marginLeft: '1%' }} onClick={() => { if (editlname) { setEditlname(false) } else { setEditlname(true) } }} type="submit" variant='contained' color='inherit'>Edit Last Name</Button>
                    <br /><br />
                    <Button style={{ width: '100%', backgroundColor: 'lightyellow', color: 'black', marginLeft: '1%' }} onClick={() => { if (edituname) { setEdituname(false) } else { setEdituname(true) } }} type="submit" variant='contained' color='inherit'>Edit User Name</Button>
                    <br /><br />
                    <Button style={{ width: '100%', backgroundColor: 'lightyellow', color: 'black', marginLeft: '1%' }} onClick={() => { if (editcno) { setEditcno(false) } else { setEditcno(true) } }} type="submit" variant='contained' color='inherit'>Edit Contact Number</Button>
                    <br /><br />
                    <Button style={{ width: '100%', backgroundColor: 'lightyellow', color: 'black', marginLeft: '1%' }} onClick={() => { if (editage) { setEditAge(false) } else { setEditAge(true) } }} type="submit" variant='contained' color='inherit'>Edit Age</Button>
                    <br /><br /><br /><br />
                    {(editage || editcno || editfname || editlname || edituname) ? <Button style={{ width: '100%', backgroundColor: 'lightyellow', color: 'black', marginLeft: '1%' }} onClick={() => { setEditAge(false); setEditcno(false); setEditfname(false); setEditlname(false); setEdituname(false); SaveChanges(id) }} type="submit" variant='contained' color='inherit'>Update</Button> : <p></p>}
                </div>
            </div>
        </div>
    )
}

