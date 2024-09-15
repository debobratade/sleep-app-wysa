"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const sleepDataRoutes_1 = __importDefault(require("./routes/sleepDataRoutes"));
const cors_1 = __importDefault(require("cors"));
// Load environment variables
dotenv_1.default.config();
// Connect to the database
(0, db_1.default)();
// Initialize Express app
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Define routes
app.use("/api/users", userRoutes_1.default);
app.use("/api/sleep", sleepDataRoutes_1.default);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
