import mongoose from "mongoose";

const allowedDomains = ["exampleuniversity.edu"]

const approverSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
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