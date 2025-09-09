import mongoose from "mongoose";

const allowedDomains = ["exampleuniversity.edu"]

const AdminSchema = mongoose.Schema({
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
        required: true,
        unique: true
    },
    role: {
        type: String,
        default: "Admin"
    }
}, { timestamps: true })

const Admin = mongoose.model("Admin", AdminSchema)

export default Admin