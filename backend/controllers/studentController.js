import Student from "../models/Users/Student.js"
import bcrypt from "bcrypt"
import { generateToken } from "../utils/JWTHelper.js"
import { validateEmail } from "../utils/emailValidate.js"
export async function registerStudent(req, res) {
    const { username, email, password, role, authType } = req.body

    try {
        // Check for email already exist
        if (email) {

            if (!validateEmail(email)) {
                return res.status(400).json({ message: "Enter valid email id, Only university email id allowed!" })
            }

            const emailexists = await Student.findOne({ email })
            if (emailexists) {
                return res.status(400).json({ message: "Email already exists" })
            }
        }

        // Check for authType, hash password and create student account and generate token
        if (authType === "email") {

            const passwordHash = await bcrypt.hash(password, 10)

            const student = await Student.create({ username, email, password: passwordHash, role, authType })

            const { password: userPassword, ...studentdetails } = student.toObject();

            const token = generateToken(studentdetails)

            res.cookie('auth_token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production", // true only if NODE_ENV=production

                // sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
                sameSite: "lax",
                maxAge: 24 * 60 * 60 * 1000
            })
            return res.status(200).json({ message: "Student registered successfully", studentdetails })
        }

    } catch (error) {
        console.log(error)
        if (error.name === "ValidationError") {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ errors: messages });
        }
        return res.status(500).json({ message: "Server error, Something went wrong!", error: error.message })

    }

}

