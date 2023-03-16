import asyncHandler from "express-async-handler"
import fileRequirement from "../model/fileRequirementModel.js"


const uploadRequirement = asyncHandler(async (req, res) => {
    try {
        const document = await fileRequirement.create({
            employee_id: req.body.employee_id,
            documentName: req.body.documentName,
            documentLink: req.body.documentLink,
            documentType: req.body.documentType
        });
        res.status(200).json(document);
    } catch (error) {
        res.status(400).json(error);
    }
})

const getAllDocument = asyncHandler(async (req, res) => {
    try {
        const document = await fileRequirement.find().populate({
            path: "employee_id",
            select: "firstName lastName middleName idNumber"
        })
        res.status(200).json(document);
    } catch (error) {
        res.status(400).json(error);
    }
})
export { uploadRequirement, getAllDocument }