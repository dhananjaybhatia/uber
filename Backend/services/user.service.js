import userModel from "../models/user.model.js";

export const createUser = async ({ firstName, lastName, email, password }) => {
  // 🛡️ Validate Required Fields
  if (!firstName || !email || !password) {
    throw new Error("First name, email, and password are required.");
  }

  // 🛡️ Check if Email Already Exists
  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    throw new Error("Email already exists. Please use a different email.");
  }

  // 🔐 Hash Password using the User Model's `hashPassword` Method
  const hashedPassword = await userModel.hashPassword(password);

  // 🛡️ Create New User
  const newUser = await userModel.create({
    fullName: {
      firstName,
      lastName,
    },
    email,
    password: hashedPassword,
  });

  // 🔑 Generate Authentication Token
  const token = newUser.generateAuthToken();

  // 🎯 Return Safe User Data with Token
  return {
    id: newUser._id,
    fullName: newUser.fullName,
    email: newUser.email,
    token,
  };
};
