import mongoose from "mongoose";
import { config } from "dotenv";
import { LOREventListerner } from "../services/LOREventListerner";

config()

let { MONGODB_URI } = process.env

export default async function connectDB() {
    try {
        const connection = await mongoose.connect(MONGODB_URI)
        if (connection) {
            console.log('Database Connected')
            // Start event listener after DB connection
            LOREventListerner()
        }
    } catch (error) {
        console.log(error)
    }
}