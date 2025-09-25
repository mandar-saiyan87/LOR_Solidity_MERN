import mongoose from "mongoose"


const LORSchema = new mongoose.Schema({
    requestId: {
        type: String,
        required: true,
        unique: true
    },

    studentAddress: {
        type: String,
        required: true
    },

    requesterAddress: {
        type: String,
        required: true
    },

    approverAddress: {
        type: String,
        default: null
    },

    fullName: {
        type: String,
        required: true
    },

    program: {
        type: String,
        required: true
    },

    university: {
        type: String,
        required: true
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

    blockNumber: {
        type: Number
    },

    pdfLink: {
        type: String // IPFS CID or full gateway URL
    },

    requestedAt: {
        type: Date,
        default: Date.now
    },

    approvedAt: {
        type: Date
    },

    rejectedAt: {
        type: Date
    }
})

