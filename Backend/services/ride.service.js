import rideModel from "../models/ride.model.js";
import { getDistanceTime } from "./map.service.js";
import crypto from "crypto";

export const getFare = async (pickup, destination) => {
  const distanceTime = await getDistanceTime(pickup, destination);

  // Validate distanceTime
  if (isNaN(distanceTime.distance) || isNaN(distanceTime.time)) {
    throw new Error("Invalid distance or time returned from getDistanceTime.");
  }

  const baseFare = {
    auto: 2,
    car: 5,
    moto: 1.5,
  };

  const perKmRate = {
    auto: 2,
    car: 3,
    moto: 1,
  };

  const perMinuteRate = {
    auto: 1.5,
    car: 2,
    moto: 1.5,
  };

  // Calculate fare for all vehicle types
  const distance = distanceTime.distance || 0;
  const time = distanceTime.time || 0;
  const fare = {
    auto: Math.round(
      baseFare.auto + perKmRate.auto * distance + perMinuteRate.auto * time
    ),
    car: Math.round(
      baseFare.car + perKmRate.car * distance + perMinuteRate.car * time
    ),
    moto: Math.round(
      baseFare.moto + perKmRate.moto * distance + perMinuteRate.moto * time
    ),
  };

  // Ensure fares are valid
  if (isNaN(fare.auto) || isNaN(fare.car) || isNaN(fare.moto)) {
    throw new Error("Calculated fare is invalid or NaN.");
  }

  return fare; // Return fares for all vehicle types
};

function getOtp(num) {
  function generateOtp(num) {
    const otp = crypto
      .randomInt(Math.pow(10, num - 1), Math.pow(10, num))
      .toString();
    return otp; // Ensure the OTP is returned
  }
  return generateOtp(num); // Return the generated OTP from the inner function
}

export const createRideService = async ({
  user,
  pickup,
  destination,
  vehicleType,
}) => {
  if (!user || !pickup || !destination || !vehicleType) {
    console.error("Missing required fields:", {
      user,
      pickup,
      destination,
      vehicleType,
    });
    throw new Error("All fields are required.");
  }

  if (!["auto", "car", "moto"].includes(vehicleType)) {
    console.error("Invalid vehicleType:", vehicleType);
    throw new Error("Invalid vehicleType provided.");
  }

  try {
    console.log("Calculating distance and time for:", { pickup, destination });
    const distanceTime = await getDistanceTime(pickup, destination);

    console.log("Calculating fare for:", { pickup, destination, vehicleType });
    const fare = await getFare(pickup, destination, vehicleType);

    // Extract the fare for the selected vehicleType
    const calculatedFare = fare[vehicleType];

    console.log("Creating ride in database:", {
      user,
      pickup,
      destination,
      fare: calculatedFare,
      distance: distanceTime.distance,
      duration: distanceTime.time,
    });
    const ride = await rideModel.create({
      user,
      pickup,
      destination,
      fare: calculatedFare, // Pass the numeric fare for the selected vehicleType
      distance: distanceTime.distance,
      duration: distanceTime.time,
      otp: getOtp(6),
    });

    return ride;
  } catch (error) {
    console.error("Error in createRideService:", error.message || error);
    throw error;
  }
};
