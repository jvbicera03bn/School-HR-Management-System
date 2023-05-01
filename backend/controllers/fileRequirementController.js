import asyncHandler from "express-async-handler"
import fileRequirement from "../model/fileRequirementModel.js"


const uploadRequirement = asyncHandler(async (req, res) => {
    try {
        const document = await fileRequirement.create({
            employee_id: req.body.employee_id,
            documentName: req.body.documentName,
            documentLink: req.body.documentLink,
            documentType: req.body.documentType,
            editedBy: req.body.editedBy
        });
        res.status(200).json(document);
    } catch (error) {
        res.status(400).json(error);
    }
})
const getLimitDocument = asyncHandler(async (req, res) => {
    try {
        const document = await fileRequirement.find()
            .sort({ createdAt: -1 })
            .populate({
                path: "employee_id",
                select: "firstName lastName middleName idNumber"
            }).populate({
                path: "editedBy",
                select: "firstName lastName middleName idNumber"
            })
            .limit(4)
        res.status(200).json(document);
    } catch (error) {
        res.status(400).json(error);
    }
})

const getAllDocument = asyncHandler(async (req, res) => {
    try {
        const document = await fileRequirement.find()
            .sort({ createdAt: -1 })
            .populate({
                path: "employee_id",
                select: "firstName lastName middleName idNumber"
            })
            .populate({
                path: "editedBy",
                select: "firstName lastName middleName"
            })
        res.status(200).json(document);
    } catch (error) {
        res.status(400).json(error);
    }
})
const getUserDocument = asyncHandler(async (req, res) => {
    try {
        const document = await fileRequirement
            .find({ employee_id: req.body.employee_id })
            .sort({ createdAt: -1 })
            .populate({
                path: "employee_id",
                select: "firstName lastName middleName idNumber"
            })
            .populate({
                path: "editedBy",
                select: "firstName lastName middleName"
            })
        res.status(200).json(document);
    } catch (error) {
        res.status(400).json(error);
    }
})
const approveDocu = asyncHandler(async (req, res) => {
    try {
        const updatedReq = await fileRequirement.findByIdAndUpdate(req.body.document_id, {
            editedBy: req.body.editedBy,
            status: "Approved"
        }, {
            new: true,
        })
        res.status(200).json(updatedReq)
    } catch (error) {
        res.status(400).json(error.message)
    }
})

const rejectDocu = asyncHandler(async (req, res) => {
    try {
        const updatedReq = await fileRequirement.findByIdAndUpdate(req.body.document_id, {
            editedBy: req.body.editedBy,
            status: "Rejected"
        }, {
            new: true,
        })
        res.status(200).json(updatedReq)
    } catch (error) {
        res.status(400).json(error.message)
    }
})
export { uploadRequirement, getAllDocument, getLimitDocument, getUserDocument, approveDocu, rejectDocu }