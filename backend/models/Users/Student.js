import mongoose from "mongoose";

const allowedDomains = ["exampleuniversity.edu"]

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
        unique: true,
        validate: function (value) {
            const domain = value.split("@")[1];
            return allowedDomains.includes(domain);
        },
        message: "Only university email addresses are allowed"
    },
    password: {
        type: String,
        required: function () {
            return this.authType === "email"; // if registered with email/password
        },
        select: false,


    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female", "Other"]
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