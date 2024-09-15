"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Define the user schema
const userSchema = new mongoose_1.default.Schema({
    nickname: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    salt: { type: String, required: true },
    ipAddress: { type: String, required: true },
});
// Create the User model
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
