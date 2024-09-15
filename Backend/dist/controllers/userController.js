"use strict";
// import { Request, Response } from "express";
// import User from "../models/userModel";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
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
exports.checkAndRegisterUser = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
}
const checkAndRegisterUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nickname, password } = req.body;
    // Retrieve the user's IP address
    const ipAddress = req.headers["x-forwarded-for"] || req.ip;
    try {
        // Find the user by nickname
        const user = yield userModel_1.default.findOne({ nickname });
        if (user) {
            // If the IP address matches, check the password
            if (user.ipAddress === ipAddress) {
                // Compare the provided password with the stored hashed password
                const isPasswordMatch = yield bcryptjs_1.default.compare(password, user.passwordHash);
                if (isPasswordMatch) {
                    // Generate JWT token
                    const token = jsonwebtoken_1.default.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });
                    // If password matches, login successful
                    return res.status(200).json({
                        message: "Login successful",
                        token,
                        userId: user._id // Include userId in the response
                    });
                }
                else {
                    // If password doesn't match, ask to re-enter password
                    return res.status(400).json({ message: "Password incorrect, please enter it again" });
                }
            }
            else {
                // If IP address does not match, register as a new user with the same nickname
                const salt = yield bcryptjs_1.default.genSalt(10);
                const passwordHash = yield bcryptjs_1.default.hash(password, salt);
                // Update the user with the new IP address and password hash
                user.passwordHash = passwordHash;
                user.salt = salt;
                user.ipAddress = ipAddress;
                yield user.save();
                // Generate JWT token for the updated user
                const token = jsonwebtoken_1.default.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });
                return res.status(201).json({
                    message: "New user registered with same nickname and different IP address",
                    token,
                    userId: user._id // Include userId in the response
                });
            }
        }
        else {
            // If user doesn't exist, register a new user with the provided password
            const salt = yield bcryptjs_1.default.genSalt(10);
            const passwordHash = yield bcryptjs_1.default.hash(password, salt);
            const newUser = new userModel_1.default({ nickname, passwordHash, salt, ipAddress }); // Save IP address in the new user
            yield newUser.save();
            // Generate JWT token for the new user
            const token = jsonwebtoken_1.default.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: "1h" });
            return res.status(201).json({
                message: "User registered successfully",
                token,
                userId: newUser._id // Include userId in the response
            });
        }
    }
    catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.checkAndRegisterUser = checkAndRegisterUser;
