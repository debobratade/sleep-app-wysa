import { Router } from "express";
import { addSleepData } from "../controllers/sleepDataController";
import { authenticateToken } from "../middleware/auth";

const router = Router();

// Protected route that requires a valid Json Web Token
router.post("/sleep-data", authenticateToken, addSleepData);

export default router;
