import Admin from "../models/Users/Admin.js"
import bcrypt from "bcrypt"
import { isvalidWalletAddress } from "../utils/verifyPublicAddress.js"
import { connectDB } from "./dbConnection.js"

// To get user input (specially to get non text visiible password)
import readlineSync from "readline-sync"



// Function to seed admin in database
const seedAdmin = async () => {
    const isDBConnected = await connectDB()
    if (!isDBConnected) {
        return
    }

    // Admin Inputs from user
    const username = "admin"
    console.log(`Admin User: ${username}`)

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


    const email = "admin@exampleuniversity.edu"
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
                username,
                email,
                password: hashedPassword,
                walletaddress: walletAddress,
                role: "Admin"
            })
            console.log(`Admin created: ${admin.email}`)
            return
        }

    } catch (error) {
        console.log(error)
    }

}

seedAdmin()