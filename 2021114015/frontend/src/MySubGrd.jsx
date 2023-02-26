import { AddBox, HdrPlus, PlusOneTwoTone } from "@mui/icons-material"
import { Box, Button, Card, CardContent, Typography } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Navbar } from "./Navbar"
export const MySubGrd = () => {
    const navigate = useNavigate();
    const addgreddiit = () => {
        navigate('/form-for-new-greddiit');
    }
    const [subgs, setSubgs] = useState([]);
    const getDetails = async () => {
        try {
            const val=localStorage.getItem("username")
            // console.log(val);
            const resp = await axios.post("http://localhost:8000/getmysubgs",{val:val});
            // console.log(resp.data);
            setSubgs(resp.data);
            // console.log(subgs);

        } catch (error) {
            console.log("error")
        }
    }
    useEffect(() => {
        getDetails()
    }, []);
    const uname=localStorage.getItem("username")
    let savedurl = `/saved-posts/${uname}`
    const Enter = (e) => {
        // setId(e);
        // console.log(e);
        let navurl = `/my-sub-greddiits/${e}`
        navigate(navurl);
        // console.log(navurl)
    }
    const Deletefn = async (e) => {
        // console.log(e)
        try {
            const resp = await axios.post("http://localhost:8000/deletesubgr", {subgrdid: e})
            getDetails()
        }
        catch (err) {
            console.log(err)
        }
    }

return(
    <div>
            <Navbar />
            <br /><br />
            <div>
                <Button onClick={ addgreddiit }><AddBox /></Button> Add New Greddiit
            </div>
            <br /><br />
            <div align="center">
                {
                    subgs.map((index) => (
                        <div align="left" style={{ width: '40%' }}>
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
                                    <Button type="submit" style={{ marginLeft: '26%' }} onClick={() => { Enter(index._id) }}>Enter</Button>
                                    <Button style={{ marginLeft: '18%' }} onClick={() => { Deletefn(index._id) }}>Delete</Button> 
                                </CardContent>
                            </Card>
                            <br /> <br />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}


