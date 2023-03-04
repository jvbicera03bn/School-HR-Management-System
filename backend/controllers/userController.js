
import asyncHandler from "express-async-handler"
import User from "../model/userModel.js"

/* 
    @desc Get User By Email
    @route GET /api/users/[email]
    @access Private 
*/
const getUserByEmail = asyncHandler(async (req, res) => {
    try {
        const user = await User.find({ email: req.body.email }, 'firstName middleName lastName email userType')
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error.message)
    }
})
/* 
    @desc Add Users/Register
    @route POST /api/Users
    @access Public 
*/
const registerUser = asyncHandler(async (req, res) => {
    try {
        const user = await User.create({
            firstName: req.body.firstName,
            middleName: req.body.middleName,
            lastName: req.body.lastName,
            userType: req.body.userType,
            department: req.body.department,
            email: req.body.email,
            password: req.body.password,
        })
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
        res.status(400).json(error.message)
    }
})

/* 
    @desc Get ALL Users
    @route GET /api/Users
    @access Private 
*/
const getUsers = asyncHandler(async (req, res) => {
    try {
        const user = await User.find({}, 'firstName middleName lastName email userType department')
        res.status(200).json({ users: user, db: User })
    } catch (error) {
        res.status(500).json(error.message)
    }
})

/* 
    @desc Update User
    @route PUT /api/Users/[id]
    @access Private 
*/
const updateUser = asyncHandler(async (req, res) => {
    /* const User = await User.findById(req.params.id) */
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })
        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(400).json(error.message)
    }
})

/* 
    @desc Delete User
    @route DELETE /api/Users[id]
    @access Private 
*/


export { getUserByEmail, getUsers, registerUser, updateUser }


