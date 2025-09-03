import { isAddress } from "viem";

export function isvalidWalletAddress(address) {
    return isAddress(address)
}