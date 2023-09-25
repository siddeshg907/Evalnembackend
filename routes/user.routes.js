const express=require("express")
const bcrypt=require("bcrypt")
const {UserModel}=require("../model/user.model")
const jwt=require("jsonwebtoken")

const userRouter=express.Router()

userRouter.post("/register",async(req,res)=>{
    const {name,email,password,gender}=req.body
    try {
        const isUser=await UserModel.findOne({email})
        if(isUser){
            res.status(401).send({"error":"User already exists"})
        }else{ bcrypt.hash(password,5,async(err,hash)=>{
            if(err){
                res.status(500).json({error:"internal server error"})
            }else if(!hash){
                res.status(400).send({"error":"internal server error"})
            }else if(hash){
                const user=new UserModel({name,email,gender,password:hash})
                await user.save()
                res.status(200).json({msg:"New user Registered successfully"})
            }
           
           
        })}
       
    } catch (err) {
        res.status(400).json({error:err})
    }
})


userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    const user=await UserModel.findOne({email})
    try {
        bcrypt.compare(password,user.password,async(err,result)=>{
            if(result){
                const token=jwt.sign({userID:user._id,name:user.name},"masai",{expiresIn:"7d"})
                res.status(200).json({msg:"Login Successfull",token})
            }else{
                res.status(200).json({msg:"Wrong Credentials"})
            }
        })
    } catch (err) {
        res.status(400).json({error:err})
    }
})


module.exports={
    userRouter
}