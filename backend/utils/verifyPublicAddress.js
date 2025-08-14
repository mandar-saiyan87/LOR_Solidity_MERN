import { ethers } from "ethers"

export function isvalidWalletAddress(address) {
    return ethers.isAddress(address)
}