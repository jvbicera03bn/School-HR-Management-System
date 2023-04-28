import express from "express"
import { getUsers, registerUser, updateUser, getUserByEmail, getMe, getNumUsers, getUserByID } from "../controllers/userController.js"
const router = express.Router()
import protect from "../middleware/authMiddleware.js"

/* Public Routes */

router.route("/login")
    .post(getUserByEmail)
router.route("/register")
    .post(protect, registerUser)
/* Private Routes */
router.route('/users')
    .get(protect, getUsers)
router.route('/userID')
    .post(protect, getUserByID)
router.route('/getNumUser')
    .get(protect, getNumUsers)
router.route('/update')
    .put(protect, updateUser)
router.route("/getme")
    .get(protect, getMe)

export default router