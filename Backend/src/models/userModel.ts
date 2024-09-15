import mongoose from "mongoose";

// Define the user schema
const userSchema = new mongoose.Schema({
    nickname: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    salt: { type: String, required: true },
    ipAddress: { type: String, required: true },
});

// Create the User model
const User = mongoose.model("User", userSchema);

export default User;
