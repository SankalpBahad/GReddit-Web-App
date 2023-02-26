import express from 'express';

const router=express.Router();

router.get('/',(req,res)=>{
    // res.send("")
    console.log("get request from /register")
})

router.post('/',(req,res)=>{
    // res.send("")
    console.log("post request from /register")
})

export default router;