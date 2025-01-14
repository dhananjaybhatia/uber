import express from "express";
import { authUser } from "../middlewares/auth.middleware.js";
import {
  getCoordinates,
  getDistanceTime,
  getAutoCompleteSuggestions,
} from "../controllers/maps.controller.js";
import { query } from "express-validator";

const router = express.Router();

// 📍 Get Coordinates
router.get(
  "/get-coordinates",
  query("address")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Address must be a string with at least 3 characters"),
  authUser,
  getCoordinates
);

// 🚗 Get Distance and Time
router.get(
  "/get-distance-time",
  query("origin")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Pickup must be a valid string"),
  query("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Destination must be a valid string"),
  authUser,
  getDistanceTime
);

router.get(
  "/get-suggestions",
  query("input").isString().isLength({ min: 3 }),
  authUser,
  getAutoCompleteSuggestions
);

export default router;
