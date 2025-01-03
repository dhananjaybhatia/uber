import express from "express";
import { body } from "express-validator";
import {
  registerCaptain,
  loginCaptain,
} from "../controllers/captain.controller.js";
import { authCaptain } from "../middlewares/auth.middleware.js";
import blacklistTokenModel from "../models/blacklistToken.model.js";

const router = express.Router();

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullName.firstName")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters long"),
    body("vehicle.color")
      .isLength({ min: 3 })
      .withMessage("Color must be at least 3 characters long"),
    body("vehicle.plate")
      .isLength({ min: 3 })
      .withMessage("Plate must be at least 3 characters long"),
    body("vehicle.capacity")
      .isInt({ min: 1 })
      .withMessage("Capacity must be at least 1"),
    body("vehicle.vehicleType")
      .isIn(["car", "motorcycle", "auto"])
      .withMessage("Invalid vehicle type"),
  ],
  registerCaptain
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters long"),
  ],
  loginCaptain
);

router.get("/profile", authCaptain, (req, res) => {
  res.status(200).json({ captain: req.captain });
});

router.get("/logout", authCaptain, async (req, res) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    await blacklistTokenModel.create({ token });
    res.clearCookie("token");
    res.status(200).json({ message: "Captain logged out successfully" });
  } catch (error) {
    console.error("Error in logout:", error.message);
    res.status(500).json({ message: error.message });
  }
});

export default router;
