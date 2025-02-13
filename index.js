import express from 'express'
import authRouter from './src/routes/auth.router.js'
import messageRouter from './src/routes/message.router.js'
import dotenv from "dotenv"
import { connectDB } from './DB/connection.js'
import cookieParser from "cookie-parser"
import cors from 'cors'
import { app , server } from './src/utils/socket.js'
import path from 'path'
dotenv.config()


const port = process.env.PORT
const __dirname = path.resolve()
app.use(express.json())
app.use(cookieParser())
// db connection
await connectDB()
// cors
app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );
// Routers 
app.use("/api/auth",authRouter)
app.use("/api/message",messageRouter)



// page not found hanle
app.all('*',(req,res,next)=>{
    return next( new Error("page not Found",{cause:404}))
})

// global error handler
app.use((error,req,res,next)=>{
    const statusCode = error.cause || 500
    return res.status(statusCode).json({
        sucess : false ,
        message : error.message,
        stack: error.stack

    })
})
server.listen(port, () => console.log(`Server listening on port ${port}!`))
