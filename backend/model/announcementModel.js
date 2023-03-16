import mongoose from "mongoose"


const announcementSchema = mongoose.Schema({
    content: {
        type: String,
        required: [true, `Please add an Announcement`]
    },
}, {
    timestamps: true
})

const Announcement = mongoose.model('Announcement', announcementSchema)

export default Announcement