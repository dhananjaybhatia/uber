import captainModel from "../models/captain.model.js";
import { createCaptain } from "../services/captain.service.js";
import { validationResult } from "express-validator";

export const registerCaptain = async (req, res) => {
  try {
    // 🛡️ Validate Request Data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Extract Data from Request
    const { fullName, email, password, vehicle} =
      req.body;

    // Destructure fullName
    const { firstName, lastName } = fullName;
    const { color, plate, capacity, vehicleType } = vehicle;

    // Create Captain Using Service
    const captain = await createCaptain({
      firstName,
      lastName,
      email,
      password,
      vehicleType,
      color,
      plate,
      capacity,
    });

    res.status(201).json({
      message: "Captain registered successfully",
      captain,
    });
  } catch (error) {
    console.error("Error in registerCaptain:", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const loginCaptain = async (req, res, next) => {
  try {
    // Validate Request Data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Extract Data from Request
    const { email, password } = req.body;

    // Check if Captain Exists
    const captain = await captainModel.findOne({ email }).select("+password");
    if (!captain) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare Passwords
    const isMatch = await captain.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 🔑 Generate JWT Token
    const token = captain.generateAuthToken();
    res.cookie("token", token);

    // 🎯 Return Success Response
    return res.status(200).json({
      message: "Captain logged in successfully",
      captain,
    });
  } catch (error) {
    console.error("Error in loginCaptain:", error.message);
    res.status(500).json({ message: error.message });
  }
};
