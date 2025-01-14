import { createRideService } from "../services/ride.service.js";
import { getFare } from "../services/ride.service.js";
import { validationResult } from "express-validator";

export const createRide = async (req, res) => {
  // Validation Check
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { pickup, destination, vehicleType } = req.body;

  try {
    const ride = await createRideService({
      user: req.user._id,
      pickup,
      destination,
      vehicleType,
    });

    return res.status(201).json({
      message: "Ride created successfully",
      ride,
    });
  } catch (error) {
    console.error("Error creating ride:", error.message || error);
    return res.status(500).json({
      message: "Failed to create ride. Please try again.",
      error: error.message,
    });
  }
};

export const getCalculatedFare = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { pickup, destination } = req.query;

  try {
    const fare = await getFare(pickup, destination);
    return res.status(200).json(fare);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
