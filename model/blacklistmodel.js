const mongoose=require("mongoose")
const blacklistSchema=mongoose.Schema({
    "token":{type:String,required:true}
})

const BlacklistModel=mongoose.model("blacklistedtoken",blacklistSchema)

module.exports={
    BlacklistModel
}