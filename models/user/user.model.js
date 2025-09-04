const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
     lastname:{
        type:String,
        required:true
    },
      email:{
        type:String,
        required:true
    },
      phone:{
        type:Number,
        required:true
    },
    country:{
        type:String,
        require:true
    },
      address:{
        type:String,
        required:true
    },
      state:{
        type:String,
        required:true
    },
      pin:{
        type:Number,
        required:true
    },
      password:{
        type:String,
        required:true
    },
      confirm_password:{
        type:String,
        required:false
    },
})

module.exports=mongoose.model("Users",userSchema)