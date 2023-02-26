import express from 'express';
const router=express.Router();

router.get('/',(req,res)=>{
    console.log("get request from /login")
})

router.post('/',(req,res)=>{
    // res.send("")
    console.log("post request from /login")
})

export default router;