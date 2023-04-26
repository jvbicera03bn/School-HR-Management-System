import mongoose from "mongoose"

const fileRequirementSchema = new mongoose.Schema({
    employee_id: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    documentLink: {
        type: String,
        required: true
    },
    documentType: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["validating", "approved", "rejected"],
        default: "validating"
    }
}, {
    timestamps: true
});
const fileRequirement = mongoose.model('fileRequirements', fileRequirementSchema);

export default fileRequirement