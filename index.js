const express=require("express")
const {connection}=require("./db")
const {userRouter}=require("./routes/user.routes")
const {postRouter}=require("./routes/post.routes")
require("dotenv").config()
const cors=require("cors")


const app=express()
app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.status(200).json({msg:"This is Home Page"})
})

app.use("/users",userRouter)
app.use("/posts",postRouter)

app.listen(8080,async()=>{
    try {
        await connection
        console.log("Connected to DB")
        console.log(`server is running on port ${8080}`)
    } catch (error) {
        console.log(error)
    }
    
})