import { Message } from "../../DB/models/message.model.js";
import { User } from "../../DB/models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import cloud from "../utils/cloud.js";
import { getReceiverSocketId, io } from "../utils/socket.js";

export const getUsers = asyncHandler(async (req, res, next) => {
    const userId = req.user._id
    const filteredUsers = await User.find({_id : {$ne :userId}}).select("-password")
    if(!filteredUsers)return next(new Error("Users Not Found ", { cause: 404 }));
    return res.json({ success: true, users : filteredUsers });
});
export const getMessages = asyncHandler(async (req, res, next) => {
    const {id} = req.params
    const sender = req.user._id
    const messages = await Message.find({
        // if am the sender or another user is the sender
        $or:[
            {sender , receiver : id}, // sender is me and receiver is another user
            {sender : id , receiver : sender} // reverse  , sender is another user and receiver is me
        ]
    })
    return res.json({ success: true, messages });
});
export const sendMessage  = asyncHandler(async (req, res, next) => {
    const { text }= req.body
    const {id: receiver}= req.params
    const sender = req.user._id
    let img
    if(req.file){
        const response= await cloud.uploader.upload(req.file.path)
        img = response.secure_url
    }
    const newMessage = new Message({
        sender , 
        receiver ,
        text ,
        img 
    })
    await newMessage.save()
    // to get socket id of user using user id 
    const receiverSocketId = getReceiverSocketId(receiver)
    if(receiverSocketId){
        io.to(receiverSocketId).emit("newMessage",newMessage)
    }

    return res.json({ success: true, newMessage });
});