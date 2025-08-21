// Logout route included
import express from "express";
import { verifyToken } from "../middleware/verifyToken.js"
import { StudentLogin, ApproverLogin, AdminLogin, GetUser } from "../controllers/LoginController.js";

const loginrouter = express.Router();

loginrouter.get("/status", (req, res) => {
    res.send("success").status(200);
});

loginrouter.post("/students", StudentLogin)
loginrouter.post("/admin", AdminLogin)
loginrouter.post("/approver", ApproverLogin)
loginrouter.post("/profile", verifyToken, GetUser)


export default loginrouter;