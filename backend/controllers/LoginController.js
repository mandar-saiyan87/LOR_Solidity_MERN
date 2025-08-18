import Student from "../models/Users/Student.js"
import Admin from "../models/Users/Admin.js"
import Approver from "../models/Users/Approver.js"
import bcrypt from "bcrypt"
import { generateToken } from "../utils/JWTHelper.js"

export async function StudentLogin(req, res) {
    const { email, password } = req.body

    try {
        const user = await Student.findOne({ email }).select('+password')
        if (!user) {
            return res.status(400).json({ message: "User not found" })
        }



        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" })
        }

        const { password: studentPassword, ...studentdetails } = user.toObject();
        console.log(studentdetails)

        const token = generateToken(studentdetails)


        return res.status(200).json({ message: "Login successful", studentdetails, token })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Server error, Something went wrong!", error: error.message })
    }
}

export async function AdminLogin(req, res) {

    const { email, password } = req.body

    try {
        const admin = await Admin.findOne({ email }).select('+password')

        if (!admin) {
            return res.status(400).json({ message: "User not found" })
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password)

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" })
        }

        const { password: adminPassword, ...admindetails } = admin.toObject();

        const token = generateToken(admindetails)

        return res.status(200).json({ message: "Login successful", admindetails, token })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Server error, Something went wrong!", error: error.message })
    }
}

export async function ApproverLogin(req, res) {

    const { email, password } = req.body

    try {
        const approver = await Approver.findOne({ email }).select('+password')

        if (!approver) {
            return res.status(400).json({ message: "User not found" })
        }

        const isPasswordValid = await bcrypt.compare(password, approver.password)

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" })
        }

        const { password: approverPassword, ...approverdetails } = approver.toObject();

        const token = generateToken(approverdetails)

        return res.status(200).json({ message: "Login successful", approverdetails, token })
    } catch (error) {
        return res.status(500).json({ message: "Server error, Something went wrong!", error: error.message })
    }

}