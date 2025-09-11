import express from "express";
import { UpdateUserController } from "../controllers/updateUserController.js";

const userupdaterouter = express.Router();

userupdaterouter.patch('/updatedetails', UpdateUserController)


export default userupdaterouter