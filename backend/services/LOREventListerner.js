import contract from "../utils/ethersprovider.js"
import Student from "../models/Users/Student.js";
import LORRequest from "../models/LOR.js";

export function LOREventListerner() {

    console.log("📡 Starting LOR event listener.....");

    contract.on("LORRequested", async (requestId, student, event) => {
        // console.log('requestId: ', requestId),
        //     console.log('Student: ', student),
        //     console.log('TxHash:', event.log.transactionHash)
        const lorRequest = await contract.getLORRequest(requestId)

        const studentDetails = await Student.findOne({ walletaddress: lorRequest.studentAddress })

        const requestData = {
            requestId: lorRequest.requestId.toString(),
            studentId: studentDetails._id,
            studentAddress: lorRequest.studentAddress,
            requesterAddress: lorRequest.requester,
            approverAddress: lorRequest.approver,
            fullname: lorRequest.name,
            program: lorRequest.program,
            university: lorRequest.university,
            status: lorRequest.isApproved ? "APPROVED" :
                lorRequest.isRejected ? "REJECTED" : "PENDING",
            txHash: event.log.transactionHash,
            blockNumber: event.log.blockNumber,
            pdfLink: null,
            requestedAt: new Date().toISOString()
        }
        // console.log(requestData)
        const newRequest = new LORRequest(requestData)
        await newRequest.save()
    })
}