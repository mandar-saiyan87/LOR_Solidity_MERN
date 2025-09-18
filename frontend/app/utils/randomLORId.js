import { createHash } from "crypto";

export function generateRandomId(userWallet) {
    const input = userWallet + crypto.randomUUID();
    const hash = createHash("sha256").update(input).digest("hex");
    const shortHex = hash.substring(0, 9);
    return parseInt(shortHex, 16).toString();
}