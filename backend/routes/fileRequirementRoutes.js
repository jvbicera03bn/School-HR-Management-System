import express from "express"
import { uploadRequirement, getAllDocument } from "../controllers/fileRequirementController.js"
import protect from "../middleware/authMiddleware.js"
const router = express.Router()



router.post("/uploadRequirement", protect, uploadRequirement)
router.get("/getDocuments", protect, getAllDocument)

export default router

