import asyncHandler from "express-async-handler"
import announcemeent from "../model/announcementModel.js"


const addAnnouncement = asyncHandler(async (req, res) => {
    try {
        const announcement = await announcemeent.create({
            content: req.body.content,
        });
        res.status(200).json(announcement);
    } catch (error) {
        res.status(400).json(error);
    }
})

const getAnnouncemnt = asyncHandler(async (req, res) => {
    try {
        const announcement = await announcemeent.find()
            .sort({ createdAt: -1 })
            .limit(5)
        res.status(200).json(announcement);
    } catch (error) {
        res.status(400).json(error);
    }
})
const getAllAnnouncemnt = asyncHandler(async (req, res) => {
    try {
        const announcement = await announcemeent.find()
            .sort({ createdAt: -1 })
        res.status(200).json(announcement);
    } catch (error) {
        res.status(400).json(error);
    }
})

export { addAnnouncement, getAnnouncemnt, getAllAnnouncemnt }