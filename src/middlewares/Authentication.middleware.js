import jwt from 'jsonwebtoken'
import { User } from '../../DB/models/user.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const isAuthenticated = asyncHandler(async (req, res, next) => {
    const token = req.cookies.token
    if (!token) return next(new Error("Token Missed!!", { cause: 401 }));
    const payload = jwt.verify(token,process.env.SECERT_KEY)
    if (!payload) return next(new Error(" invalid token ", { cause: 401 }));
    const user = await User.findById(payload.userId).select("-password")
    if (!user) return next(new Error(" user not found", { cause: 404 }));
    req.user = user 
    next()
});