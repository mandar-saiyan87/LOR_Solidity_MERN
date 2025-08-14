import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
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
        required: [true, "At least one wallet address is required"],
        validate: [
            {
                validator: arr => arr.length > 0,
                message: "At least one wallet address is required"
            },
            {
                validator: arr => new Set(arr).size === arr.length,
                message: "Duplicate wallet addresses in the same account"
            }
        ]
    },
    program: { type: String },
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