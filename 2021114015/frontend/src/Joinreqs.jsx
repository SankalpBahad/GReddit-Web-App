import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";

export const Joinreqs = () => {
    const { id } = useParams();
    // console.log(id)
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [uname, setUname] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [cno, setCno] = useState('');

    useEffect(() => {
        JoinReqs()
    }, [])
    const [joinrequests, setJoinrequests] = useState([]);
    const JoinReqs = async () => {
        // console.log(id)
        const resp = await axios.post("http://localhost:8000/joinreqdata", { id: id })
        // console.log(resp.data)
        setJoinrequests(resp.data)
        // console.log(joinrequests);
        // setFname(resp.data.first_name);
        // console.log(fname)
        // setLname(resp.data.last_name);
        // setUname(resp.data.user_name);
        // setEmail(resp.data.email);
    }
// for(let i=0;i<joinrequests.length;i=i+1)
// {
//     console.log(joinrequests[i])
// }
    const Accept = async (e) => {
        const resp = await axios.post("http://localhost:8000/acceptjoinreq", { id: id, uname: e })
    }
    const Reject = async (e) => {
        const resp = await axios.post("http://localhost:8000/rejectjoinreq", { id: id, uname: e })
    }

    return (
        <div>
            <h1>Pending Joining Requests:</h1>
            <br /><br /><br />
            {
                joinrequests.map((index) => (
                    <div style={{ marginLeft: "10%", fontSize: "1.5rem" }}>
                        {
                            <div>
                                Username:&nbsp;&nbsp;&nbsp;&nbsp; {index.user_name} &nbsp;&nbsp;&nbsp;&nbsp; <Button variant="outlined" onClick={() => { Accept(index.user_name) }}>Accept</Button> &nbsp;&nbsp;&nbsp;&nbsp; <Button variant="outlined" onClick={() => { Reject(index.user_name) }}>Reject</Button>
                                <br/><br/>
                                First Name:&nbsp;&nbsp;&nbsp;&nbsp; {index.first_name}
                                <br/>
                                Last Name:&nbsp;&nbsp;&nbsp;&nbsp; {index.last_name}
                                <br/>
                                Email:&nbsp;&nbsp;&nbsp;&nbsp; {index.email}
                            </div>
                        }
                    </div>
                ))
            }
        </div>
    )
}