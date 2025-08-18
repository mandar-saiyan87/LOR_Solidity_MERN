import express from "express";
import { createapprover } from "../controllers/approverController";
import { verifyToken } from "../middleware/verifyToken";
import { checkAdmin } from "../middleware/roleAuth";


const approverrouter = express.Router();

approverrouter.get("/status", (req, res) => {
    res.send("success").status(200)
});

approverrouter.post("/register", verifyToken, checkAdmin, createapprover)

export default approverrouter;