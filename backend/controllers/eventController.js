import asyncHandler from "express-async-handler"
import eventModel from "../model/eventModel.js"


const addEvent = asyncHandler(async (req, res) => {
    try {
        const event = await eventModel.create({
            eventTitle: req.body.eventTitle,
            eventDate: req.body.eventDate,
            eventDescription: req.body.eventDescription,
        });
        res.status(200).json(event);
    } catch (error) {
        res.status(400).json(error);
    }
})

const getLimitEvent = asyncHandler(async (req, res) => {
    try {
        const event = await eventModel.find()
            .sort({ createdAt: -1 })
            .limit(5)
        res.status(200).json(event);
    } catch (error) {
        res.status(400).json(error);
    }
})
const getAllEvent = asyncHandler(async (req, res) => {
    try {
        const event = await eventModel.find()
            .sort({ createdAt: -1 })
        res.status(200).json(event);
    } catch (error) {
        res.status(400).json(error);
    }
})

export { addEvent, getLimitEvent, getAllEvent }