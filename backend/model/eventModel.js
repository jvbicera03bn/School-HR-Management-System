import mongoose from "mongoose"


const eventSchema = mongoose.Schema({
    eventTitle: {
        type: String,
        required: [true, `Please add a Event Title`]
    },
    eventDate: {
        type: Date,
        default: new Date()
    },
    eventDescription: {
        type: String,
        required: [true, `Please add a Event Description`]
    }
})

const Event = mongoose.model('Event', eventSchema)

export default Event