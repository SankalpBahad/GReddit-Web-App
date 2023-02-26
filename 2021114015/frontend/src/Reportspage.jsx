import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios";
import { Button, Card } from "@mui/material";

export const ReportsPage = () => {
    const [reports, setReports] = useState([]);
    const { id } = useParams();
    const getrepdetails = async () => {
        const resp = await axios.post("http://localhost:8000/getallreports", { subgid: id });
        setReports(resp.data.data)
        console.log(reports)
        // console.log(resp.data)
    }
    useEffect(() => {
        getrepdetails()
    }, [])

    const toggleindex=async(e)=>{
        const resp=await axios.post("http://localhost:8000/togglevisibility",{id:e})
    }
    const BlockUser = async (e) => {
        const resp = await axios.post("http://localhost:8000/blockafterreport", { subgid: id, user: e })
    }

    const DeletePost = async (e) => {
        const resp = await axios.post("http://localhost:8000/deletepostafterreport", { subgid: id, postid: e })
    }
    

    return (
        <div>
            <h1>Unattended Reports: </h1>
            {
                reports.map((index, key) => (
                    <div key={key}>
                        <Card style={{ marginTop: "5%", marginLeft: "5%", width: "60%" }}>
                            <div style={{ marginLeft: "1%" }}>
                                <p>Reported By: {index.reported_by}</p>
                                <p>Reported User: {index.reported_user}</p>
                                <p>Content of the Reported Post: {index.posttext} </p>
                                <p>Concern of the Reporter: {index.concern}</p>
                                <p align="center"><Button disabled={index.visibility?false:true} onClick={() => { BlockUser(index.reported_user) }}>Block User</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Button disabled={index.visibility?false:true} onClick={() => { DeletePost(index.postid) }}>Delete Post</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Button onClick={()=>{toggleindex(index._id)}}>Ignore</Button></p>
                            </div>
                        </Card>
                    </div>
                ))
            }
        </div>
    )
}