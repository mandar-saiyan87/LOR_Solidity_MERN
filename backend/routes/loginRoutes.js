// Logout route included
import express from "express";
import { StudentLogin, ApproverLogin, AdminLogin, GetUser } from "../controllers/LoginController.js";
import verifyToken from "../middleware/verifyToken.js";

const loginrouter = express.Router();

loginrouter.get("/status", (req, res) => {
    res.send("success").status(200);
});

loginrouter.post("/students", StudentLogin)
loginrouter.post("/admin", AdminLogin)
loginrouter.post("/approver", ApproverLogin)
loginrouter.get("/profile", verifyToken, GetUser)


export default loginrouter;