const express=require("express")
const {auth}=require("../middleware/auth.middleware")
const {UserModel}=require("../model/user.model")
const {PostModel}=require("../model/post.model")



const postRouter=express.Router()
postRouter.use(auth)





postRouter.post("/add",auth,async(req,res)=>{
    const payload=req.body
 try {
       
       const newPost=new PostModel(payload)
       const user=await UserModel.findOne({"_id":req.body.userID})
       const count=Number(user.posts)+1
       await UserModel.findByIdAndUpdate({_id:req.body.userID},{posts:count})
       const post=await newPost.save()
       res.status(200).send({"msg":"A new Post added"})
    } catch (err) {
    
       res.status(400).json({msg:"server error"})
   }
})

postRouter.get("/",auth,async (req,res)=>{
    try {
        
        const posts=await PostModel.find({name:req.body.name})

        req.statusCode(200).send(posts)
    } catch (error) {
        
        res.status(400).send({"error":error})
    }
})

postRouter.patch("/update/:id",auth,async(req,res)=>{
    const {id}=req.params
    try {
        const post=await PostModel.findOne({_id:id})
        if(post.userID==req.body.userID){
            await PostModel.findByIdAndUpdate({_id:id},req.body)
            res.send({"msg":"post updated"})
        }else{
            res.status(403).send({"error":"you are not auth"})
        }
    } catch (error) {
        res.status(500).send({"error":"internal server error"})
    }
})

postRouter.patch("/delete/:id",auth,async(req,res)=>{
    const {id}=req.params
    try {
        const post=await PostModel.findOne({_id:id})
        if(post.userID==req.body.userID){
            await PostModel.findByIdAndDelete({_id:id})
            res.send({"msg":"post Deleted"})
        }else{
            res.status(403).send({"error":"you are not auth"})
        }
    } catch (error) {
        res.status(500).send({"error":"internal server error"})
    }
})
module.exports={
    postRouter
}