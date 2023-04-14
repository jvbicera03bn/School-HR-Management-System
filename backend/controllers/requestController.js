import asyncHandler from "express-async-handler"
import request from "../model/requestsModel.js"


const uploadRequest = asyncHandler(async (req, res) => {
    try {
        const requestRes = await request.create({
            employee_id: req.body.employee_id,
            requestMessage: req.body.requestMessage,
            requestType: req.body.requestType,
            numberOfDays: req.body.numberOfDays
        });
        res.status(200).json(requestRes);
    } catch (error) {
        res.status(400).json(error);
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
        res.status(200).json(requestRes);
    } catch (error) {
        res.status(400).json(error);
    }
})

const approveRequest = asyncHandler(async (req, res) => {
    try {
        const updatedReq = await request.findByIdAndUpdate(req.params.id, {
            status: "Approved"
        }, {
            new: true,
        })
        res.status(200).json(updatedReq)
    } catch (error) {
        res.status(400).json(error.message)
    }
})

const rejectRequest = asyncHandler(async (req, res) => {
    try {
        const updatedReq = await request.findByIdAndUpdate(req.params.id, {
            status: "Rejected"
        }, {
            new: true,
        })
        res.status(200).json(updatedReq)
    } catch (error) {
        res.status(400).json(error.message)
    }
})

export { getUserRequest, uploadRequest, approveRequest, rejectRequest }
