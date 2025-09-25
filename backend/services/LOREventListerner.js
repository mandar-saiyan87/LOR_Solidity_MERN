import contract from "../utils/ethersprovider.js"

export function LOREventListerner() {

    console.log("📡 Starting LOR event listener.....");

    contract.on("LORRequested", async (requestId, student, event) => {
        // console.log('requestId: ', requestId),
        //     console.log('Student: ', student),
        //     console.log('TxHash:', event.log.transactionHash)
        const lorRequest = await contract.getLORRequest(requestId)

        const requestData = {
            requestId: lorRequest.requestId.toString(),
            studentAddress: lorRequest.studentAddress,
            requesterAddress: lorRequest.requester,
            approverAddress: lorRequest.approver,
            fullName: lorRequest.name,
            program: lorRequest.program,
            university: lorRequest.university,
            status: lorRequest.isApproved ? "APPROVED" :
                lorRequest.isRejected ? "REJECTED" : "PENDING",
            txHash: event.log.transactionHash,
            blockNumber: event.log.blockNumber,
            pdfLink: null,
            requestedAt: new Date().toISOString()
        }
    })
}