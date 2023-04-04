import express from "express"
import { addAnnouncement, getAnnouncemnt, getAllAnnouncemnt } from "../controllers/announcementController.js"
import protect from "../middleware/authMiddleware.js"
const router = express.Router()


router
    .post("/postAnnouncement", protect, addAnnouncement)
    .get("/getAnnouncement", protect, getAnnouncemnt)
    .get("/getAllAnnouncemnt", protect, getAllAnnouncemnt)

export default router