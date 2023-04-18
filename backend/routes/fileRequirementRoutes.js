import express from "express"
import { uploadRequirement, getAllDocument, getLimitDocument, getUserDocument, approveDocu, rejectDocu } from "../controllers/fileRequirementController.js"
import protect from "../middleware/authMiddleware.js"
const router = express.Router()


router
    /* Post */
    .post("/uploadRequirement", protect, uploadRequirement)
    .post("/getUserDocument", protect, getUserDocument)
    /* Get */
    .get("/getDocuments", protect, getAllDocument)
    .get("/getLimitDocument", protect, getLimitDocument)
    /* Put */
    .put("/approveDocument", protect, approveDocu)
    .put("/rejectDocument", protect, rejectDocu)

export default router

