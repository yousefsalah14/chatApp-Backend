import { User } from "../../DB/models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import bcryptjs from 'bcryptjs'
import { generateToken } from "../utils/generateToken.js";
import cloud from '../utils/cloud.js'

export const signup = asyncHandler(async (req, res, next) => {
    const { fullName,email , password   } = req.body
    // check user 
    const user = await User.findOne({ email });
    if (user) return next(new Error("User Already Exist", { cause: 409 }));
    // hash password 
    let hashPassword =  bcryptjs.hashSync(password , parseInt(process.env.ROUND))
    const newUser = await User.create({
        fullName,
        email ,
        password : hashPassword
    })
    if(newUser){
        generateToken(newUser._id ,res)
        await newUser.save()
        return res.status(201).json({ success: true, message: "User Created Successfully✅" ,user : {
            id : newUser._id ,
            fullName :newUser.fullName,
            email : newUser.email,
            profilePic : newUser.profilePic
        } });
    }
    return res.json({ success: false, message: "faild to create user " });
    
});
export const login = asyncHandler(async (req, res, next) => {
    const {email, password} = req.body
    //check user 
    const user = await User.findOne({ email });
    if (!user) return next(new Error("Invalid Credentials", { cause: 404 }));
    // check password 
    const match = bcryptjs.compareSync(password , user.password)
    if (!match) return next(new Error("Invalid Credentials", { cause: 404 }));
    generateToken(user._id , res)
    return res.json({ success:true , message: "user logged in✅",user : {
        id : user._id ,
        fullName :user.fullName,
        email : user.email,
        profilePic : user.profilePic
    } });


});
export const logout = asyncHandler(async (req, res, next) => {
    res.cookie("token","",{maxAge :0 })
    return res.json({ success: true, message: "Logged out " });
});
export const updatePic  = asyncHandler(async (req, res, next) => {
    
    const userId = req.user._id
    if (!req.file) return next(new Error(" You Must Upload Profile Pic ", { cause: 400 }));
    const uploadResponse = await cloud.uploader.upload(req.file.path)
    const user = await User.findByIdAndUpdate(userId,{profilePic : uploadResponse.secure_url},{new : true}).select("-password") // new : true -> to  return updated user 
    return res.json({ success: true, user });
});
export const getUser = asyncHandler(async (req, res, next) => {
    return res.json({ success: true, user : req.user });
});