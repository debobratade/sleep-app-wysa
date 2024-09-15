"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sleepDataController_1 = require("../controllers/sleepDataController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Protected route that requires a valid Json Web Token
router.post("/sleep-data", auth_1.authenticateToken, sleepDataController_1.addSleepData);
exports.default = router;
