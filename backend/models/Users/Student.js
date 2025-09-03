import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: function () {
            return this.authType === "email"; // if registered with email/password
        },
        select: false,


    },
    walletaddress: {
        type: [String],
        unique: true
    },
    role: {
        type: String,
        default: "Student"
    },
    authType: {
        type: String,
        enum: ["email", "wallet"],
        required: true
    }

}, { timestamps: true })

const Student = mongoose.model("Student", studentSchema)

export default Student