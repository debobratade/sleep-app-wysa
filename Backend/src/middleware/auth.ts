import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // Retrieve the token from the Authorization header (Bearer token)
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    (req as any).user = decoded;

    // Check if the userId in the token matches the one in the request body
    if (req.body.userId !== decoded.userId) {
      return res.status(403).json({ message: "User ID mismatch. Access denied." });
    }

    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};


