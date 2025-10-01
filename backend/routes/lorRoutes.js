import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { GetLORbyUserController } from "../controllers/lorController.js";

const lorrouter = express.Router();

lorrouter.get("/status", (req, res) => {
    res.send("success").status(200);
});

lorrouter.get("/getlor", verifyToken, GetLORbyUserController)

export default lorrouter;