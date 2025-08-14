import express from "express"
import cors from "cors"
import connectDB from "./config/db.js"
import studentrouter from "./routes/studentRoutes.js"



connectDB()
const app = express()
const port = 5000

app.use(cors())
app.use(express.json())


app.use("/students", studentrouter)



app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
