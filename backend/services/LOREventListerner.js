import contract from "../utils/ethersprovider.js"

export function LOREventListerner() {

    console.log("📡 Starting LOR event listener.....");

    contract.on("LORRequested", (requestId, student, event) => {
        console.log('requestId: ', requestId),
            console.log('Student: ', student),
            console.log('TxHash:', event.log.transactionHash)
    })
}