import jwt from 'jsonwebtoken'
export const generateToken  = (userId, res)=>{
    const token = jwt.sign({userId},process.env.SECERT_KEY,{expiresIn :"2d"})
    res.cookie("token",token,{
        maxAge : 2 * 24 * 60*60 * 1000, // max age in ms
        httpOnly :true , //  prevent XSS attacks
        sameSite :"strict",
        secure : process.env.NODE_ENV  !== "development"  // prevent CSRF attacks
    })
    return token
}