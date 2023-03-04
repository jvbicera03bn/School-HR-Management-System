import express from "express"
import { getUsers, registerUser, updateUser, getUserByEmail } from "../controllers/userController.js"
const router = express.Router()


router.route('/users')
    .get(getUsers)
router.route('/:id')
    .put(updateUser)
router.route("/login")
    .post(getUserByEmail)
router.route("/register")
    .post(registerUser)

export default router