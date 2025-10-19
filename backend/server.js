import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import connectDB from "./config/db.js"
import studentrouter from "./routes/studentRoutes.js"
import authrouter from "./routes/authRoutes.js"
import approverrouter from "./routes/approverRoutes.js"
import userupdaterouter from "./routes/userUpdateRoute.js"
import lorrouter from "./routes/lorRoutes.js"




connectDB()
const app = express()
const port = 5000

app.use(cookieParser())
app.use(cors({
    origin: [
        // "https://lor-solidity-frontend.vercel.app",
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ],
    credentials: true
}))

app.use(express.json())
app.set('view engine', 'ejs')
app.set("views", path.join(process.cwd(), "lortemplate"));


app.use("/api/students", studentrouter)
app.use("/api/auth", authrouter)
app.use("/api/approver", approverrouter)
app.use("/api/user", userupdaterouter)
app.use("/api/lor", lorrouter)




app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
    console.log("Running in:", process.env.NODE_ENV)
})
