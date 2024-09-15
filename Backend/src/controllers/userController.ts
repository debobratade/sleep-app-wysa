import { Request, Response } from "express";
import User from "../models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

export const checkAndRegisterUser = async (req: Request, res: Response) => {
  if (!req.body.nickname || !req.body.password) {
    return res.status(400).json({ message: "Missing credential, please enter it again" });
  }
  const { nickname, password } = req.body;
  // Retrieve the user's IP address
  const ipAddress = req.headers["x-forwarded-for"] || req.ip;

  try {
    // Find the user by nickname
    const user: any = await User.findOne({ nickname });

    if (user) {
      // If the IP address matches, check the password
      if (user.ipAddress === ipAddress) {
        // Compare the provided password with the stored hashed password
        const isPasswordMatch = await bcrypt.compare(password, user.passwordHash);

        if (isPasswordMatch) {
          // Generate JWT token
          const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });

          // If password matches, login successful
          return res.status(200).json({
            message: "Login successful",
            token,
            userId: user._id  
          });
        } else {
          // If password doesn't match, ask to re-enter password
          return res.status(400).json({ message: "Password incorrect, please enter it again" });
        }
      } else {
        // If IP address does not match, register as a new user with the same nickname
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // Update the user with the new IP address and password hash
        user.passwordHash = passwordHash;
        user.salt = salt;
        user.ipAddress = ipAddress;
        await user.save();

        // Generate JWT token for the updated user
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });

        return res.status(201).json({
          message: "New user registered with same nickname and different IP address",
          token,
          userId: user._id  
        });
      }
    } else {
      // If user doesn't exist, register a new user with the provided password
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      const newUser = new User({ nickname, passwordHash, salt, ipAddress });
      await newUser.save();

      // Generate JWT token for the new user
      const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: "1h" });

      return res.status(201).json({
        message: "User registered successfully",
        token,
        userId: newUser._id  
      });
    }
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
