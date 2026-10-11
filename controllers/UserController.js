//const user = require("../models/user");
const User=require("../models/user");
const bcryptjs=require("bcryptjs");
const makeToken = require("../utils/makeToken");

exports.register=async(req,res,next)=>{
    try{
        const {name,email,password,confirmPassword}=req.body
        if(!name){
            return res.status(404).json({
                message:"Enter the name"
            })
        }
        if(!email){
            return res.status(404).json({
                message:"Enter the email"
            })
        }
        if(!password || !confirmPassword){
            return res.status(404).json({
                message:"Enter the password"
            })
        }
        if(password != confirmPassword){
            return res.status(400).json({
                message:"Confirm password doesn't match with the password"
            })
        }

        const hashedPassword=await bcryptjs.hash(password,10);
        const user=await User.create({
            name,
            email,
            password: hashedPassword
        })
        res.status(201).json({
            id: user._id,
            name:user.name,
            email:user.email
        })
    }
    catch(err){
        console.log("Registration error: ", err);
        next(err);        
    }
}


exports.login = async(req, res, next) => {
    try{
        const{email, password} =req.body;
        if(!email){
            return res.status(401).json({
                messgae: "Email not found"
            })
        }
        if(!password){
            return res.status(401).json({
                messgae: "Password not found"
            })
        }

        const user = await User.findOne({email}).select("+password");

        if(!user){
            return res.status(401).json({
                message: "User not found"
            })
        }

        const ok = await bcryptjs.compare(password, user.password);

        if(!ok){
            return res.status(400).json({
                message: "Invalid email or password"
            })
        }

        res.status(200).json({
            token: makeToken(user)
        })
    }
    catch(err) {
        next(err)
    }
    
}