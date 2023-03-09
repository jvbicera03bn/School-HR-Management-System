import mongoose from "mongoose"


const attendanceSchema = mongoose.Schema({
    employee_id: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    timeIn: {
        type: Date,
        default: new Date().now
    },
    timeOut: {
        type: Date,
        default: ""
    }
})

const Attendance = mongoose.model('Attendance', attendanceSchema)

export default Attendance