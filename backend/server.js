import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import connectDB from "./config/db.js"
import studentrouter from "./routes/studentRoutes.js"
import authrouter from "./routes/authRoutes.js"
import approverrouter from "./routes/approverRoutes.js" 
import userupdaterouter from "./routes/userUpdateRoute.js"





connectDB()
const app = express()
const port = 5000

app.use(cors({
    origin: [
        "https://lor-solidity-frontend.vercel.app",
        "http://localhost:3000"
    ],
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())


app.use("/api/students", studentrouter)
app.use("/api/auth", authrouter)
app.use("/api/approver", approverrouter)
app.use("/api/user", userupdaterouter)




app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
