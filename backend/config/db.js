import mongoose from "mongoose";
import { config } from "dotenv";

config()

let { MONGODB_URI } = process.env

export default async function connectDB() {
    try {
        const connection = await mongoose.connect(MONGODB_URI)
        if (connection) {
            console.log('Database Connected')
        }
    } catch (error) {
        console.log(error)
    }
}