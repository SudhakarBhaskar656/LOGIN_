const mongoose=require('mongoose')

const adminSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
type:String,
require:true
    },
    role:{
        type:String,
        require:true,
        default:"Admin"
    }
})
module.exports=mongoose.model("admin",adminSchema)