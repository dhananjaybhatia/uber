import {
  getAddressCoordinate,
  getDistanceTime as mapServiceGetDistanceTime,
  getAutoCompleteSuggestions as mapServiceGetAutoCompleteSuggestions,
} from "../services/map.service.js";
import { validationResult } from "express-validator";

// 📍 Fetch Coordinates
export const getCoordinates = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { address } = req.query;

  try {
    const coordinates = await getAddressCoordinate(address);
    return res.status(200).json(coordinates);
  } catch (error) {
    console.error("Error fetching coordinates:", error.message || error);
    return res
      .status(500)
      .json({ message: "Failed to fetch coordinates. Please try again." });
  }
};

// 🚗 Fetch Distance and Time
export const getDistanceTime = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { origin, destination } = req.query;

  try {
    const result = await mapServiceGetDistanceTime(origin, destination);
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching distance and time:", error.message || error);
    return res.status(500).json({
      message: "Failed to fetch distance and time. Please try again.",
    });
  }
};

export const getAutoCompleteSuggestions = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { input } = req.query;
    const suggestions = await mapServiceGetAutoCompleteSuggestions(input);
    res.status(200).json(suggestions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
