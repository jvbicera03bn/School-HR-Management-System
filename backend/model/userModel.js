import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, `Please add a First Name`]
    },
    middleName: {
        type: String,
        required: [true, `Please add a Middle Name`]
    },
    lastName: {
        type: String,
        required: [true, `Please add a Last Name`]
    },
    email: {
        type: String,
        required: [true, `Please add an Email`],
        unique: true
    },
    password: {
        type: String,
        required: [true, `Please add a Password`]
    },
    userType: {
        type: String,
        enum: ['EMP', 'HR'],
        default: 'EMP',
    },
    department: {
        type: String,
        enum: ['College', 'Senior High School', 'Basic Education', 'All of the Above', 'Undefined'],
        default: 'Undefined',
    }
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema)

export default User