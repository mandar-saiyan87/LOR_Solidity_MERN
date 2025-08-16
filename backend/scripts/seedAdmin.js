import dotenv from "dotenv"
import Admin from "../models/Users/Admin.js"
import mongoose from "mongoose"
import bcrypt from "bcrypt"
import { isvalidWalletAddress } from "../utils/verifyPublicAddress.js"

// To get user input (specially to get non text visiible password)
import readlineSync from "readline-sync"


dotenv.config()

const { MONGODB_URI } = process.env

// Connect to DB
const connectDB = async () => {
    try {
        const connection = await mongoose.connect(MONGODB_URI)
        if (connection) {
            console.log('Database Connected')
            return true
        }
    } catch (error) {
        console.log(error)
        return false
    }
}

// Function to seed admin in database
const seedAdmin = async () => {
    const isDBConnected = await connectDB()
    if (!isDBConnected) {
        return
    }

    // Admin Inputs from user
    const name = "admin"
    console.log(`Admin User: ${name}`)

    // Ask password and confirm
    let passwordConfirm = false
    let password = ""
    while (!passwordConfirm) {

        const setpassword = readlineSync.question("Enter Admin Password: ", {
            hideEchoBack: true
        })
        if (setpassword.length < 5) {
            console.log("Password length must be atleast 5 characters")
        } else {
            const confirmpassword = readlineSync.question("Confirm Password: ", {
                hideEchoBack: true
            })
            if (setpassword !== confirmpassword) {
                console.log("Passwords do not match")
            } else {
                password = setpassword
                passwordConfirm = true
            }
        }
    }


    const email = "admin@example.com"
    console.log(`Admin Email: ${email}`)

    // Ask wallet address and confirm
    let walletConfirm = false
    let walletAddress = ""
    while (!walletConfirm) {
        const setwalletaddress = readlineSync.question("Enter Admin/Contract Owner Wallet Address: ")
        if (!isvalidWalletAddress(setwalletaddress)) {
            console.log("Invalid Wallet Address")
        } else {
            if (readlineSync.keyInYN("Confirm wallet address: Y/N : ")) {
                walletAddress = setwalletaddress
                walletConfirm = true
            }
        }
    }

    try {

        const accountExist = await Admin.countDocuments({})

        if (accountExist) {
            console.log("Admin account already exist")
            return
        } else {

            const hashedPassword = await bcrypt.hash(password, 10)
            const admin = await Admin.create({
                name,
                email,
                password: hashedPassword,
                walletaddress: walletAddress,
                role: "Admin"
            })
            console.log(`Admin created: ${admin.email}`)
        }

    } catch (error) {
        console.log(error)
    }
    return

}

seedAdmin()