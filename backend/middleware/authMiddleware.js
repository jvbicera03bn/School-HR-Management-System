import jwt from "jsonwebtoken"
import asyncHandler from "express-async-handler"
import User from "../model/userModel.js"


const protect = asyncHandler(async (req, res, next) => {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            /* get tokenj */
            token = req.headers.authorization.split(' ')[1]
            /* verify token */
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            /* Get user From the Token */
            req.user = await User.findById(decoded.id).select('-password')
            
            next()
        } catch (error) {
            res.status(400).json(error.errors)
            throw new Error('Not Authorized')
        }
    }
    if (!token) {
        res.status(401).json({ message: "Token Doesnt Match/ Not Authorized" })
    }
})

export default protect