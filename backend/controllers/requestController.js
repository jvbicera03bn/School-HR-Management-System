import asyncHandler from "express-async-handler"
import request from "../model/requestsModel.js"
import User from "../model/userModel.js"

const uploadRequest = asyncHandler(async (req, res) => {
    try {
        const requestRes = await request.create({
            employee_id: req.body.employee_id,
            requestMessage: req.body.requestMessage,
            requestType: req.body.requestType,
            numberOfDays: req.body.numberOfDays,
            editedBy: req.body.editedBy
        });
        res.status(200).json(requestRes);
    } catch (error) {
        res.status(400).json(error);
    }
})
const getRequest = asyncHandler(async (req, res) => {
    try {
        const requestRes = await request.find({})
            .sort({ createdAt: -1 })
            .populate({
                path: "employee_id",
                select: "firstName lastName middleName idNumber"
            })
            .populate({
                path: "editedBy",
                select: "firstName lastName middleName"
            })
        res.status(200).json(requestRes)
    } catch (error) {
        res.status(400).json(error)
    }
})

const getUserRequest = asyncHandler(async (req, res) => {
    try {
        const requestRes = await request
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
        res.status(200).json(requestRes);
    } catch (error) {
        res.status(400).json(error);
    }
})

const approveRequest = asyncHandler(async (req, res) => {

    try {
        const updatedReq = await request.findByIdAndUpdate(req.body.document_id, {
            editedBy: req.body.editedBy,
            status: "Approved"
        }, {
            new: true,
        })
        const leavesAndStatus = await User.findById({
            _id: updatedReq.employee_id
        }, "leavesLeft")

        const leavesLeft = await leavesAndStatus.leavesLeft - updatedReq.numberOfDays
        if (updatedReq.depHeadApproval == "Approved") {
            const deductLeaves = await User.findByIdAndUpdate(leavesAndStatus._id, {
                leavesLeft: leavesLeft
            })
        }
        res.status(200).json({ updatedReq })
    } catch (error) {
        res.status(400).json(error.message)
    }
})

const rejectRequest = asyncHandler(async (req, res) => {
    try {
        const updatedReq = await request.findByIdAndUpdate(req.body.document_id, {
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
const approveRequestDepHead = asyncHandler(async (req, res) => {
    try {
        const updatedReq = await request.findByIdAndUpdate(req.body.document_id, {
            editedBy: req.body.editedBy,
            depHeadApproval: "Approved"
        }, {
            new: true,
        })

        const leavesAndStatus = await User.findById({
            _id: updatedReq.employee_id
        }, "leavesLeft")

        const leavesLeft = await leavesAndStatus.leavesLeft - updatedReq.numberOfDays
        if (updatedReq.status == "Approved"){
            const deductLeaves = await User.findByIdAndUpdate(leavesAndStatus._id, {
                leavesLeft: leavesLeft
            })
        }
        res.status(200).json(updatedReq)
    } catch (error) {
        res.status(400).json(error.message)
    }
})

const rejectRequestDepHead = asyncHandler(async (req, res) => {
    try {
        const updatedReq = await request.findByIdAndUpdate(req.body.document_id, {
            editedBy: req.body.editedBy,
            depHeadApproval: "Rejected"
        }, {
            new: true,
        })
        res.status(200).json(updatedReq)
    } catch (error) {
        res.status(400).json(error.message)
    }
})

export { getUserRequest, uploadRequest, approveRequest, rejectRequest, getRequest, approveRequestDepHead, rejectRequestDepHead }
