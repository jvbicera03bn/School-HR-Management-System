import mongoose from "mongoose"

const requestSchema = new mongoose.Schema({
    employee_id: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    requestMessage: {
        type: String,
        required: true
    },
    requestType: {
        type: String,
        required: true
    },
    numberOfDays: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["Checking", "Approved", "Rejected"],
        default: "Checking"
    },
    depHeadApproval: {
        type: String,
        enum: ["Checking", "Approved", "Rejected"],
        default: "Checking"
    },
    editedBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        default: 0
    },
}, {
    timestamps: true
});
const request = mongoose.model('request', requestSchema);

export default request