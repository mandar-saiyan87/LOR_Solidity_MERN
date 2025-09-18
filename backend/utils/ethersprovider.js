import { ethers } from "ethers";
import contractabi from "../contracts/LORABI.json"
import dotenv from "dotenv"

dotenv.config()

const provider = new ethers.WebSocketProvider(process.env.RPC_URL);
const contract = new ethers.Contract(process.env.LOR_CONTRACT_ADDRESS, contractabi.abi, provider);

export default contract