import { Request, Response } from "express";
import SleepData from "../models/sleepDataModel";
import User from "../models/userModel";

export const addSleepData = async (req: Request, res: Response) => {
    const {
        userId,
        sleepGoal,
        sleepStruggle,
        sleepHours,
        bedtime,
        wakeTime
    } = req.body;

    try {
        // Check if the userId exists
        const userExists = await User.findById(userId);

        if (!userExists) {
            return res.status(404).json({ message: "User not found" });
        }

        // Calculate totalSleepTime and sleepEfficiency
        const totalSleepTime = sleepHours;
        const sleepEfficiency = Math.min((sleepHours / 8) * 100, 100);

        // Create and save new sleep data entry
        const newSleepData = new SleepData({
            userId,
            goals: sleepGoal,
            sleepDuration: sleepStruggle,
            bedTime: bedtime,
            wakeUpTime: wakeTime,
            totalSleepTime,
            sleepEfficiency
        });

        const savedData = await newSleepData.save();
        return res.status(201).json({ sleep_efficiency: sleepEfficiency });
    } catch (error: any) {
        console.error("Server error:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};
