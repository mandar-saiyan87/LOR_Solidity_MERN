import mongoose from "mongoose"


const LORSchema = new mongoose.Schema({
    requestId: {
        type: String,
        required: true,
        unique: true
    },
    student: {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student",
            required: true
        },
        walletaddress: {
            type: String,
            required: true
        }
    },
    approver: {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Approver",
            required: true
        },
        walletaddress: {
            type: String
        }
    },
    metadata: {
        pupose: { type: String, required: true },
        university: { type: String, required: true },
        description: { type: String },
    },
    status: {
        type: String,
        enum: ["PENDING", "APPROVED", "REJECTED"],
        default: "PENDING"
    },
    txHash: {
        type: String,
        required: true
    },
    blocknumber: {
        type: Number
    },
    timestamps: {
        requestedAt: { type: Date, default: Date.now },
        approvedAt: { type: Date },
        rejectedAt: { type: Date },
    },
})

