import { ethers } from "ethers";
import contractabi from "../contracts/LORABI.json" with { type: 'json'}
import dotenv from "dotenv"

dotenv.config()

// Listen to events realtime (WebSocket provider)
const wsprovider = new ethers.WebSocketProvider(process.env.RPC_URL);
const contract = new ethers.Contract(process.env.LOR_CONTRACT_ADDRESS, contractabi.abi, wsprovider);

// Listen to events (past eventlogs - JSON-RPC provider)
const jsonprovider = new ethers.JsonRpcProvider(process.env.RPC_URL_INFURA);
const contractEventLogs = new ethers.Contract(process.env.LOR_CONTRACT_ADDRESS, contractabi.abi, jsonprovider);

export default contract
export { contractEventLogs }