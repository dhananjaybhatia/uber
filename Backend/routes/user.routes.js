import express from "express";
import { body } from "express-validator";
import blacklistTokenModel from "../models/blacklistToken.model.js";
import {
  registerUser,
  loginUser,
  getUserProfile,
} from "../controllers/user.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

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
  ],
  registerUser
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters long"),
  ],
  loginUser
);

router.get("/profile", authUser, (req, res) => {
  res.status(200).json({ user: req.user });
});

router.get("/logout", authUser, async (req, res) => {
    try {
        const token = req.cookies.token;
        await blacklistTokenModel.create({ token });
        res.clearCookie("token");
        res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        console.error("Error in logout:", error.message);
        res.status(500).json({ message: error.message });
    }
});

export default router;
