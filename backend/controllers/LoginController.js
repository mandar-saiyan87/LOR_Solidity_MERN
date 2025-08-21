
// Logout function is also included in same file at the bottom

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

        res.cookie('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000
        })

        return res.status(200).json({ message: "Login successful", studentdetails })

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


        res.cookie('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000
        })

        return res.status(200).json({ message: "Login successful", admindetails })

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

        res.cookie('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000
        })

        return res.status(200).json({ message: "Login successful", approverdetails })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Server error, Something went wrong!", error: error.message })
    }

}

export function Logout(req, res) {
    res.clearCookie('auth_token')
    return res.status(200).json({ message: "Logout successful" })
}

export async function GetUser(req, res) {
    const { user } = req

    try {

        if (!user) {
            return res.status(400).json({ message: "User not found" })
        }

        switch (user.role) {
            case "Admin":
                const admin = await Admin.findOne({ email: user.email }).select('-password')
                const { password: adminPassword, ...admindetails } = admin.toObject();
                return res.status(200).json({ message: "User found", user: admindetails })
            case ("Approver"):
                const approver = await Approver.findOne({ email: user.email }).select('-password')
                const { password: approverPassword, ...approverdetails } = approver.toObject();
                return res.status(200).json({ message: "User found", user: approverdetails })
            default:
                const student = await Student.findOne({ email: user.email }).select('-password')
                const { password: studentPassword, ...studentdetails } = student.toObject();
                return res.status(200).json({ message: "User found", user: studentdetails })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Server error, Something went wrong!", error: error.message })
    }



}