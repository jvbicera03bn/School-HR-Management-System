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
        enum: ['college', 'seniorHighSchool', 'basicEducation', 'Undefined'],
        default: 'Undefined',
    },
    sex: {
        type: String,
        enum: ['female', 'male', 'other'],
        required: [true, `Please add a Password`]
    },
    birthDate: {
        type: Date,
        required: [true, `Please add a Birht Date`]
    },
    IDNumber: {
        type: Number,
        required: [true, `Please add a ID Number`]
    },
    employeeStatus: {
        type: String,
        enum: ['regular', 'partTime'],
        required: [true, `Please add a Employee Status`]
    },
    civilStatus: {
        type: String,
        enum: ['married', 'divorce', 'seperated', 'widowed','single'],
        required: [true, `Please add a Civil Status`]
    },
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema)

export default User