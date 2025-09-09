
// Logout function is also included in same file at the bottom

import Student from "../models/Users/Student.js"
import Admin from "../models/Users/Admin.js"
import Approver from "../models/Users/Approver.js"
import bcrypt from "bcrypt"
import { generateToken } from "../utils/JWTHelper.js"
import { validateEmail } from "../utils/emailValidate.js"


const UserRoles = {
    student: Student,
    admin: Admin,
    approver: Approver
}


export async function LoginController(req, res) {
    const { email, password, role } = req.body

    try {
        const UserModel = UserRoles[role.toLowerCase()]

        if (!UserModel) {
            return res.status(400).json({ message: "Invalid role" })
        }

        const user = await UserModel.findOne({ email }).select('+password')

        if (!user) {
            return res.status(400).json({ message: "User not found" })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" })
        }

        const { password: userPassword, ...userdetails } = user.toObject();

        const token = generateToken(userdetails)

        res.cookie('auth_token', token, {
            httpOnly: true,
            // secure: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000
        })

        return res.status(200).json({ message: "Login successful", userdetails })


    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Server error, Something went wrong!", error: error.message })

    }

}


export function LogoutController(req, res) {
    res.clearCookie('auth_token')
    return res.status(200).json({ message: "Logout successful" })
}

export async function GetUserController(req, res) {
    const { user } = req

    try {
        const UserModel = UserRoles[user.role.toLowerCase()]
        const userdetails = await UserModel.findOne({ email: user.email }).select('-password')
        return res.status(200).json({ message: "Login successful", userdetails })


    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Server error, Something went wrong!", error: error.message })
    }



}

export async function WalletLoginController(req, res) {
    const { email, walletaddress, role } = req.body


    try {
        if (!walletaddress) {
            return res.status(400).json({ message: "Wallet address is required" })
        }

        // Check user exist with walletadress
        const UserModel = UserRoles[role.toLowerCase()]

        if (!UserModel) {
            return res.status(400).json({ message: "Invalid role" })
        }
        let userDetails = await UserModel.findOne({ walletaddress: walletaddress }).select('-password')


        if (userDetails) {

            const token = generateToken(userDetails)

            res.cookie('auth_token', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'lax',
                maxAge: 24 * 60 * 60 * 1000
            })

            return res.status(200).json({ message: "Login successful", userDetails })
        }

        if (!email) {
            return res.status(404).json({ message: "Email is required" })
        }


        if (!validateEmail(email)) {
            return res.status(400).json({ message: "Only university email ids allowed" })
        }


        // Check user exist with email
        userDetails = await UserModel.findOne({ email: email }).select('-password')

        if (userDetails) {
            if (!userDetails.walletaddress.includes(walletaddress)) {
                userDetails.walletaddress.push(walletaddress)
                await userDetails.save()
            }

            const token = generateToken(userDetails)

            res.cookie('auth_token', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'lax',
                maxAge: 24 * 60 * 60 * 1000
            })

            return res.status(200).json({ message: "Login successful", userDetails })
        } else {
            userDetails = await UserModel.create({
                username: email.split("@")[0],
                email: email,
                walletaddress: [walletaddress],
                role: "Student",
                authType: "wallet"
            })

            const token = generateToken(userDetails)

            res.cookie('auth_token', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'lax',
                maxAge: 24 * 60 * 60 * 1000
            })
            return res.status(200).json({ message: "Login successful", userDetails })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Server error, Something went wrong!", error: error.message })
    }

}