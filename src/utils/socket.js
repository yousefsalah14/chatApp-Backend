import {Server} from 'socket.io'
import http from 'http'
import express from 'express'
const app = express()
const server = http.createServer(app)
const io = new Server(server,{cors:{origin:["http://localhost:5173"]}})
const userSocketMap = {} // {userId : socketId}
export const getReceiverSocketId = (userId) => userSocketMap[userId]
io.on("connection",(socket)=>{
    console.log("user connected has id : ",socket.id)
    const userId = socket.handshake.query.userId
    if(userId){
        userSocketMap[userId] = socket.id
    }
    io.emit("getOnlineUsers",Object.keys(userSocketMap))
    socket.on("disconnect",()=>{
        console.log("user disconnected has id : ",socket.id)
        delete userSocketMap[userId]
        
        io.emit("getOnlineUsers",Object.keys(userSocketMap))
    })

});
export {io,server , app}