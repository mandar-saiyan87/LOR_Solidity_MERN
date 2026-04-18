import dotenv from "dotenv"
import mongoose from "mongoose"
import path from "path"
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../.env") });

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
