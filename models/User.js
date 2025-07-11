const mongoose= require("mongoose");

const userSchema= mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true});

const User= mongoose.model("User",userSchema);
module.exports=User;