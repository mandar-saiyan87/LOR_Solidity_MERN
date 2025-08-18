import Approver from "../models/Users/Approver.js"
import bcrypt from "bcrypt"
import { generateToken } from "../utils/JWTHelper.js"

export async function createapprover(req, res) {

    const { name, email, password, walletaddress, designation, department } = req.body

    try {

    } catch (error) {
        if (error.name === "ValidationError") {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ errors: messages });
        }
        return res.status(500).json({ message: "Server error, Something went wrong!", error: error.message })
    }
}