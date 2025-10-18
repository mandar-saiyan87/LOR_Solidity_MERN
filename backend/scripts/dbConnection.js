import dotenv from "dotenv"
import mongoose from "mongoose"

dotenv.config()

const { MONGODB_URI } = process.env

// Connect to DB
export const connectDB = async () => {
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
