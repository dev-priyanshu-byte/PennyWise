const User=require("../models/User");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");


const registerUser=async(req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email||!password)
        {
            return res.status(400).json({message:"enter email and password"});
        }
        const find= await User.findOne({email});
        if(find)
        {
            return res.status(400).json({message:"Already registered"});
        }
        const salt= await bcrypt.genSalt(10);
        const hashed= await bcrypt.hash(password,salt);

        const user= new User({email,password:hashed});
        user.save();
        res.status(200).json({ id: user._id, email: user.email });
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}

const loginUser=async(req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email||!password){
            return res.status(400).json({message:"Enter an email and a password"});
        }
        const user= await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"User not found"});
        }
        const match=await bcrypt.compare(password,user.password);
        if(!match){
            return res.status(400).json({message:"Wrong Password"});
        }

        const token=jwt.sign({id:user._id},process.env.SECRET,{expiresIn:"2h"});

        res.status(200).json({token,user:{id:user._id,email:user.email}});
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}

module.exports={registerUser,loginUser};