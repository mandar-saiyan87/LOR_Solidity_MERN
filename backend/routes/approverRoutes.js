import express from "express";
import { CreateApproverController } from "../controllers/approverController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { checkAdmin } from "../middleware/roleAuth.js";


const approverrouter = express.Router();

approverrouter.get("/status", (req, res) => {
    res.send("success").status(200)
});

approverrouter.post("/register", verifyToken, checkAdmin, CreateApproverController)

export default approverrouter;