import express from "express"
import { getUserRequest, uploadRequest, approveRequest, rejectRequest } from "../controllers/requestController.js"
import protect from "../middleware/authMiddleware.js"
const router = express.Router()

router
    .post("/addRequest", protect, uploadRequest)
    .post("/getUserRequest", protect, getUserRequest)
    .put("/rejectRequest", protect, rejectRequest)
    .put("/AcceptRequest", protect, approveRequest)

export default router

