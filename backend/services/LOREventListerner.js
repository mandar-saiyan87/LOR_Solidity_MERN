import contract from "../utils/ethersprovider.js"

export function LOREventListerner() {

    console.log("📡 Starting LOR event listener.....");

    contract.on("LORRequested", (event) => {
        console.log(event)
    })
}