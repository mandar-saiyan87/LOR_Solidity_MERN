import express from "express";
import { createapprover } from "../controllers/approverController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { checkAdmin } from "../middleware/roleAuth.js";


const approverrouter = express.Router();

approverrouter.get("/status", (req, res) => {
    res.send("success").status(200)
});

approverrouter.post("/register", verifyToken, checkAdmin, createapprover)

export default approverrouter;