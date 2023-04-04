import express from "express"
import { uploadRequirement, getAllDocument, getLimitDocument } from "../controllers/fileRequirementController.js"
import protect from "../middleware/authMiddleware.js"
const router = express.Router()



router
    .post("/uploadRequirement", protect, uploadRequirement)
    .get("/getDocuments", protect, getAllDocument)
    .get("/getLimitDocument", protect, getLimitDocument)

export default router

