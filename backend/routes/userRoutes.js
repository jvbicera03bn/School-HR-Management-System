import express from "express"
import { getUsers, registerUser, updateUser, getUserByEmail, getMe } from "../controllers/userController.js"
const router = express.Router()
import protect from "../middleware/authMiddleware.js"



/* Public Routes */
router.route('/users')
    .get(getUsers)
router.route("/login")
    .post( getUserByEmail)
router.route("/register")
    .post(registerUser)
/* Private Routes */
router.route('/:id')
    .put(protect, updateUser)
router.route("/getme")
    .get(protect, getMe)

export default router