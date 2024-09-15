"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Enum for sleep goals (Question 1)
const sleepGoalsEnum = [
    "I would go to sleep easily",
    "I would sleep through the night",
    "I'd wake up on time, refreshed",
];
// Enum for sleep duration (Question 2)
const sleepDurationEnum = [
    "Less than 2 weeks",
    "2 to 8 weeks",
    "More than 8 weeks"
];
// Define the user schema
const sleepDataSchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true },
    goals: {
        type: String,
        enum: sleepGoalsEnum, // Restrict choices to the defined enum
        required: true
    },
    sleepDuration: {
        type: String,
        enum: sleepDurationEnum, // Restrict choices to the defined enum
        required: true
    },
    bedTime: {
        hour: { type: Number, required: true },
        minute: { type: Number, required: true },
        format: { type: String, required: true }
    },
    wakeUpTime: {
        hour: { type: Number, required: true },
        minute: { type: Number, required: true },
        format: { type: String, required: true }
    },
    totalSleepTime: { type: Number, required: true },
    sleepEfficiency: { type: Number, required: true }
});
// Create the SleepData model
const SleepData = mongoose_1.default.model("SleepData", sleepDataSchema);
exports.default = SleepData;
