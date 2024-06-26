import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";
import { Modal } from "@mui/material";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";

export const Users = () => {
    const { id } = useParams();
    // console.log(id)
    useEffect(() => {
        Usernames();
        Blocked();
    }, [])
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [uname, setUname] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [cno, setCno] = useState('');
    const [currentusers, setCurrentusers] = useState([]);
    const [currentusersdata, setCurrentusersdata] = useState([]);
    const [blockedusers, setBlockedusers] = useState([]);
    const [blockedusersdata, setBlockedusersdata] = useState([]);

    const getUname = async (e) => {
        // console.log(e)
        try {
            // console.log(val);
            const resp = await axios.post("http://localhost:8000/getuserdata", {
                val: e
            });
            // console.log(resp.data.details)
            setLname(resp.data.details.last_name)
            setFname(resp.data.details.first_name)
            setUname(resp.data.details.user_name)
            setAge(resp.data.details.age)
            setCno(resp.data.details.contactnumber)
            setEmail(resp.data.details.email)
            // setUname(resp.data.details);
            // console.log(followers)
            // console.log(following)
        } catch (error) {
            console.log("error")
        }
    }

    const Usernames = async () => {
        // console.log(id)
        const resp = await axios.post("http://localhost:8000/usersdata", { id: id })
        // console.log(resp.data)
        setCurrentusers(resp.data)
        // console.log(currentusers)
    }
    // for (let i = 0; i < currentusers.length; i = i + 1) {
    //     // console.log(currentusers[i])
    //     getUname(currentusers[i])
    // }
    const Blocked = async () => {
        // console.log(id)
        const resp = await axios.post("http://localhost:8000/blockedusersdata", { id: id })
        // console.log(resp.data)
        setBlockedusers(resp.data)
        // console.log(currentusers)
    }

    return (
        <div>
            <h1>Non Blocked Users:</h1>
            <br />
            {
                currentusers.map((index) => (
                    <div style={{ marginLeft: "10%", fontSize: "1.5rem" }}>
                       <h5>{index}</h5>
                    </div>
                ))
            }
            <br /><br />
            <h1>Blocked Users:</h1>
            <br />
            {
                blockedusers.map((index) => (
                    <div style={{ marginLeft: "10%", fontSize: "1.5rem" }}>
                        <h5>{index}</h5>
                    </div>
                ))
            }
        </div>
    )
}