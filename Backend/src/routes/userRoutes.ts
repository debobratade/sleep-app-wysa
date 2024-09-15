import express from "express";
import { checkAndRegisterUser } from "../controllers/userController";
const router = express.Router();

router.post("/check-and-register", checkAndRegisterUser);

export default router;
