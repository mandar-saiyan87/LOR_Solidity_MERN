import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import connectDB from "./config/db.js"
import studentrouter from "./routes/studentRoutes.js"
import loginrouter from "./routes/loginRoutes.js"
import approverrouter from "./routes/approverRoutes.js"



connectDB()
const app = express()
const port = 5000

app.use(cors())
app.use(express.json())
app.use(cookieParser())


app.use("/students", studentrouter)
app.use("/login", loginrouter)
app.use("/approver", approverrouter)



app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
