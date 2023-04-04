import express from "express"
import { addEvent, getLimitEvent, getAllEvent } from "../controllers/eventController.js"
import protect from "../middleware/authMiddleware.js"
const router = express.Router()

router
    .post("/addEvent", protect, addEvent)
    .get("/getEvents", protect, getAllEvent)
    .get("/getLimitEvent", protect, getLimitEvent)

export default router

