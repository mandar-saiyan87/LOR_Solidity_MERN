import contractabi from "./LORABI.json"

export const contractConfig = {
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    abi: contractabi.abi
};