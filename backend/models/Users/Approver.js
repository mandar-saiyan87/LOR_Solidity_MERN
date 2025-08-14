import mongoose from "mongoose";

const approverSchema = new mongoose.schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    walletaddress: {
        type: String,
        require: true,
        unique: true
    },
    designaation: {
        type: String
    },
    department: {
        type: String
    },
    role: {
        type: String,
        default: "Approver"
    }
})