
import asyncHandler from "express-async-handler"
import User from "../model/userModel.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

/* 
    @desc Get User By Email / LOGIN
    @route GET /api/users/
    @access Private 
*/
const getUserByEmail = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                token: generateToken(user._id)
            })
        } else {
            throw new Error("Invalid Credentials")
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
})
/* 
    @desc Add Users/Register
    @route POST /api/register
    @access Public 
*/
const registerUser = asyncHandler(async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const user = await User.create({
            firstName: req.body.firstName,
            middleName: req.body.middleName,
            lastName: req.body.lastName,
            userType: req.body.userType,
            department: req.body.department,
            email: req.body.email,
            birthDate: req.body.birthDate,
            IDNumber: req.body.IDNumber,
            employeeStatus: req.body.employeeStatus,
            civilStatus: req.body.civilStatus,
            sex: req.body.sex,
            password: hashedPassword,
        })
        res.status(200).json({
            message: `User ${user.firstName} ${user.middleName} ${user.lastName} Has been registered`,
            _id: user.id,
            firstName: user.firstName,
            middleName: user.middleName,
            lastName: user.lastName,
            token: generateToken(user._id)
        })
    } catch (error) {
        /* If Email Exist */
        if (error.keyPattern) {
            res.status(400).json({ emailExist: "User Already Exist", ...error })
        }
        else {
            res.status(400).json(error.errors)
        }
    }
})
/* 
    @desc Add Users/Register
    @route POST /api/user/getme
    @access Private 
*/
const getMe = asyncHandler(async (req, res) => {
    const { _id, firstName, lastName, middleName, userType, email } = await User.findById(req.user._id)
    try {
        res.status(200).json({
            _id: _id,
            firstName: firstName,
            lastName: lastName,
            middleName: middleName,
            userType: userType,
            email: email,
        })
    } catch (error) {
        res.status(400).json(error)
    }
})
/* ------------Not-Auth---------- */
/* 
    @desc Get ALL Users
    @route GET /api/Users
    @access Private 
*/
const getUsers = asyncHandler(async (req, res) => {
    try {
        const user = await User.find({}, 'IDNumber firstName middleName lastName email department employeeStatus _id')
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

/* Generate JWT */
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '362d',
    })
}

export { getUserByEmail, getUsers, registerUser, updateUser, getMe }


