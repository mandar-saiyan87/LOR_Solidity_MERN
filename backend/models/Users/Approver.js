import mongoose from "mongoose";

const approverSchema = new mongoose.Schema({
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
    designation: {
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

const Approver = mongoose.model("Approver", approverSchema)
export default Approver