import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import userRoutes from "./routes/userRoutes";
import sleepDataRoutes from "./routes/sleepDataRoutes";
import cors from "cors"

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

// Initialize Express app
const app = express();
app.use(express.json());

// Establish Cross-Origin Resource Sharing
app.use(cors())

// Define routes
app.use("/api/users", userRoutes);
app.use("/api/sleep", sleepDataRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
