import express from "express";
import { StudentLogin } from "../controllers/LoginController.js";
import { AdminLogin } from "../controllers/LoginController.js";

const loginrouter = express.Router();

loginrouter.get("/status", (req, res) => {
    res.send("success").status(200);
});

loginrouter.post("/students", StudentLogin)
loginrouter.post("/admin", AdminLogin)

export default loginrouter;