import Approver from "../models/Users/Approver.js"
import bcrypt from "bcrypt"
import { generateToken } from "../utils/JWTHelper.js"
import { isvalidWalletAddress } from "../utils/verifyPublicAddress.js"

export async function createapprover(req, res) {

    const { name, email, password, walletaddress, designation, department } = req.body

    try {

        if (email) {

            const emailExist = await Approver.findOne({ email })
            if (emailExist) {
                return res.status(400).json({ message: "Email already exists" })
            }
        }

        if (!walletaddress) {
            return res.status(400).json({ message: "Wallet address is required" })
        }

        const validwalletaddress = isvalidWalletAddress(walletaddress)

        if (!validwalletaddress) {
            return res.status(400).json({ message: "Invalid wallet address" })
        }

        const walletExist = await Approver.findOne({ walletaddress })

        if (walletExist) {
            return res.status(400).json({ message: "Wallet address already exists" })
        }

        const passwordHash = await bcrypt.hash(password, 10)

        const newApprover = await Approver.create({
            name,
            email,
            password: passwordHash,
            walletaddress,
            designation,
            department
        })

        return res.status(200).json({ message: "Approver created successfully", newApprover })

    } catch (error) {
        if (error.name === "ValidationError") {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ errors: messages });
        }
        return res.status(500).json({ message: "Server error, Something went wrong!", error: error.message })
    }
}