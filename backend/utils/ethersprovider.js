import { ethers } from "ethers";
import contractabi from "../contracts/LORABI.json" with { type: 'json'}
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../.env") });


// Listen to events realtime (WebSocket provider)
function getWsContract() {
    const wsprovider = new ethers.WebSocketProvider(process.env.WSS_URL);
    const contract = new ethers.Contract(process.env.LOR_CONTRACT_ADDRESS, contractabi.abi, wsprovider);
    return contract
}

// Listen to events (past eventlogs - JSON-RPC provider)
function getContractEventLogs() {
    const jsonprovider = new ethers.JsonRpcProvider(process.env.RPC_URL_INFURA);
    const contractEventLogs = new ethers.Contract(process.env.LOR_CONTRACT_ADDRESS, contractabi.abi, jsonprovider);
    return contractEventLogs
}

export { getWsContract, getContractEventLogs }