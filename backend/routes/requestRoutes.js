import express from "express"
import { getUserRequest, uploadRequest, approveRequest, rejectRequest, getRequest } from "../controllers/requestController.js"
import protect from "../middleware/authMiddleware.js"
const router = express.Router()

router
    .post("/addRequest", protect, uploadRequest)
    .get("/getRequest", protect, getRequest)
    .post("/getUserRequest", protect, getUserRequest)
    .put("/rejectRequest", protect, rejectRequest)
    .put("/acceptRequest", protect, approveRequest)

export default router

