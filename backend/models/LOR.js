import mongoose from "mongoose"


const LORSchema = new mongoose.Schema({
    requestId: {
        type: String,
        required: true,
        unique: true
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        default: null
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

    fullname: {
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
    updatedtxHash: {
        type: String
    },

    blockNumber: {
        type: Number
    },
    updatedblockNumber: {
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

const LORRequest = mongoose.model("LORRequest", LORSchema)
export default LORRequest

