import { Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const FormForSubGrd = () => {

    const [subgrdname, setsubgrdname] = useState('');
    const [subgrddesc, setsubgrddesc] = useState('');
    const [bannedkeys, setbannedkeys] = useState('');
    const [followers, setfollowers] = useState(1);
    const [tags,setTags]=useState('');
    const [posts, setposts] = useState(0);
    // const [email, setEmail] = useState('');
    const navigate = useNavigate()
    const user = localStorage.getItem("username")
    // console.log(user);
    const Submit = async () => {

        let data = {
            creator: user,
            followers: followers,
            posts: posts,
            subgrdname: subgrdname,
            subgrddesc: subgrddesc,
            tags:tags,
            bannedkeys: bannedkeys,
        };
        console.log(data)
        try {
            const resp = await axios.post("http://localhost:8000/newsubgrdform", data);
            // console.log("no error")
            // console.log(resp.data)
        }
        catch (err) {
            console.log(err)
            console.log("error is here")
        }

        navigate('/my-sub-greddiits')
    }
    return (
        <div align="center" style={{ marginTop: '10%' }}>
            <form className='form' style={{
                color: 'black',
                marginTop: '10%',
                backgroundColor: "white",
                width: 400
            }}>
                <h2>Create a new SubGreddiit</h2>
                <p style={{ marginTop: '15%', fontSize: '20px' }}>
                    Name: <TextField variant="standard" type="text" value={subgrdname} onChange={(e) => setsubgrdname(e.target.value)} />
                    <br />
                    <br />
                    Description: <TextField variant="standard" type="text" value={subgrddesc} onChange={(e) => setsubgrddesc(e.target.value)} />
                    <br />
                    <br />
                    List of Tags
                    <br />
                    <br />
                    <TextField variant="outlined" type="text" value={tags} onChange={(e) => setTags(e.target.value)} />
                    List of Banned Keywords
                    <br />
                    <br />
                    <TextField variant="outlined" type="text" multiline rows={4} value={bannedkeys} onChange={(e) => setbannedkeys(e.target.value)} />
                    <br /><br /><br />
                    <Button onClick={Submit} color="inherit" variant="outlined">Create</Button>
                </p>
            </form>
        </div>
    )
}