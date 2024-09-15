import mongoose from "mongoose";

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
const sleepDataSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  goals: {
    type: String,
    enum: sleepGoalsEnum,
    required: true
  },
  sleepDuration: {
    type: String,
    enum: sleepDurationEnum, 
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


const SleepData = mongoose.model("SleepData", sleepDataSchema);

export default SleepData;
