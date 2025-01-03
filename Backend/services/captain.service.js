import captainModel from "../models/captain.model.js";

export const createCaptain = async ({
  firstName,
  lastName,
  email,
  password,
  vehicleType,
  color,
  plate,
  capacity,
}) => {
  if (
    !firstName ||
    !email ||
    !password ||
    !vehicleType ||
    !color ||
    !plate ||
    !capacity
  ) {
    throw new Error("All fields are required.");
  }

  const existingCaptain = await captainModel.findOne({ email });
  if (existingCaptain) {
    throw new Error("Email already exists. Please use a different email.");
  }

  const hashedPassword = await captainModel.hashPassword(password);

  const newCaptain = await captainModel.create({
    fullName: {
      firstName,
      lastName,
    },
    email,
    password: hashedPassword,
    vehicle: {
      vehicleType,
      color,
      plate,
      capacity,
    },
  });

  const token = newCaptain.generateAuthToken();
  return {
    id: newCaptain._id,
    fullName: newCaptain.fullName,
    email: newCaptain.email,
    vehicle: newCaptain.vehicle,
    token,
  };
};
