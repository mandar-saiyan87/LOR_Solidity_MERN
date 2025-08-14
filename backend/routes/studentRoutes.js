import express from "express";
import { registerStudent } from "../controllers/studentController.js";

const studentrouter = express.Router();


studentrouter.get("/status", (req, res) => {
    res.send("success").status(200);
});

studentrouter.post("/register", registerStudent)



export default studentrouter;