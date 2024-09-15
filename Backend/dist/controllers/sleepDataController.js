"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addSleepData = void 0;
const sleepDataModel_1 = __importDefault(require("../models/sleepDataModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
const addSleepData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, sleepGoal, sleepStruggle, sleepHours, bedtime, wakeTime } = req.body;
    try {
        // Check if the userId exists
        const userExists = yield userModel_1.default.findById(userId);
        if (!userExists) {
            return res.status(404).json({ message: "User not found" });
        }
        // Calculate totalSleepTime and sleepEfficiency
        // Example calculation logic; modify based on your requirements
        const totalSleepTime = sleepHours; // Assuming totalSleepTime is directly sleepHours
        const sleepEfficiency = (sleepHours / 8) * 100; // Example calculation for efficiency
        // Create and save new sleep data entry
        const newSleepData = new sleepDataModel_1.default({
            userId,
            goals: sleepGoal, // Map sleepGoal to goals
            sleepDuration: sleepStruggle, // Map sleepStruggle to sleepDuration
            bedTime: bedtime, // Map bedtime to bedTime
            wakeUpTime: wakeTime, // Map wakeTime to wakeUpTime
            totalSleepTime,
            sleepEfficiency
        });
        const savedData = yield newSleepData.save();
        return res.status(201).json({ sleep_efficiency: '80%' });
    }
    catch (error) {
        console.error("Server error:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
});
exports.addSleepData = addSleepData;
