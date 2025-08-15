import Student from "../models/Users/Student.js"
import bcrypt from "bcrypt"
import { isvalidWalletAddress } from "../utils/verifyPublicAddress.js"
import { generateToken } from "../utils/generateJWT.js"
export async function registerStudent(req, res) {
    const { name, email, password, walletaddress, program, role, authType } = req.body

    try {
        // Check for email already exist
        if (email) {
            const emailexists = await Student.findOne({ email })
            if (emailexists) {
                return res.status(400).json({ message: "Email already exists" })
            }
        }

        // Check for wallet address present in body
        if (!walletaddress) {
            return res.status(400).json({ message: "Wallet address is required" })
        }

        // Check if address is valid
        const validwalletaddress = isvalidWalletAddress(walletaddress)

        if (!validwalletaddress) {
            return res.status(400).json({ message: "Invalid wallet address" })
        }

        // Check for wallet address already exist
        const walletExist = await Student.findOne({ walletaddress })
        if (walletExist) {
            return res.status(400).json({ message: "Wallet address already exists" })
        }


        // Check for authType, hash password and create student account and generate token
        if (authType === "email") {

            const passwordHash = await bcrypt.hash(password, 10)

            const student = await Student.create({ name, email, password: passwordHash, walletaddress: [walletaddress], program, role, authType })

            const token = generateToken(student)


            return res.status(201).json({ message: "Student registered successfully", student, token })
        }

        // If authType is wallet, create user without password nad generate token

        else {
            const student = await Student.create({ name, email, walletaddress, program, role, authType }).select('-password')

            const token = generateToken(student)

            return res.status(201).json({ message: "Student registered successfully", student, token })
        }
    } catch (error) {
        return res.status(500).json({ message: "Server error, Something went wrong!", error: error.message })

    }

}

