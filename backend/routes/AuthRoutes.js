// Logout route included
import express from "express";
import { verifyToken } from "../middleware/verifyToken.js"
import { LoginController, GetUserController, LogoutController } from "../controllers/AuthController.js";

const authrouter = express.Router();

authrouter.get("/status", (req, res) => {
    res.send("success").status(200);
});

authrouter.post("/login", LoginController)
authrouter.post("/profile", verifyToken, GetUserController)
authrouter.post("/logout", LogoutController)


export default authrouter;