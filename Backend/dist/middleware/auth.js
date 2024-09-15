"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
}
const authenticateToken = (req, res, next) => {
    console.log(req.body);
    // Retrieve the token from the Authorization header (Bearer token)
    const authHeader = req.headers["authorization"];
    console.log(authHeader);
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }
    try {
        // Verify the token
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET); // Assume token contains userId
        req.user = decoded; // Attach user info (userId) to the request object
        // Check if the userId in the token matches the one in the request body
        if (req.body.userId !== decoded.userId) {
            return res.status(403).json({ message: "User ID mismatch. Access denied." });
        }
        next(); // Proceed to the next middleware or route handler
    }
    catch (error) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};
exports.authenticateToken = authenticateToken;
