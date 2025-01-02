import { validationResult } from "express-validator";
import { createUser } from "../services/user.service.js";
import userModel from "../models/user.model.js";

export const registerUser = async (req, res) => {
  try {
    // 🛡️ Validate Request Data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Extract Data from Request
    const { fullName, email, password } = req.body;

    // Destructure fullName
    const { firstName, lastName } = fullName;

    // Create User Using Service
    const user = await createUser({ firstName, lastName, email, password });

    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.error("Error in registerUser:", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res, next) => {
  try {
    // Validate Request Data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Extract Data from Request
    const { email, password } = req.body;

    // Check if User Exists
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare Passwords
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 🔑 Generate JWT Token
    const token = user.generateAuthToken();

    // 🎯 Return Success Response
    res.status(200).json({
      message: "User logged in successfully",
      token,
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
      },
    });
  } catch (error) {
    console.error("Error in loginUser:", error.message);
    res.status(500).json({ message: error.message });
  }
};
