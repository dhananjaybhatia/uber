import blacklistTokenModel from "../models/blacklistToken.model.js";
import captainModel from "../models/captain.model.js";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const authUser = async (req, res, next) => {
  try {
    // 🛡️ Extract Token
    const token =
      req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }
    const isBlacklisted = await blacklistTokenModel.findOne({ token: token });

    if (isBlacklisted) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Token blacklisted" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded._id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    // Attach User to Request Object
    req.user = user;

    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Invalid or expired token" });
  }
};

export const authCaptain = async (req, res, next) => {
  try {
    // 🛡️ Extract Token
    const token =
      req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }
    const isBlacklisted = await blacklistTokenModel.findOne({ token: token });

    if (isBlacklisted) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Token blacklisted" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const captain = await captainModel
      .findById(decoded._id)
      .select("-password");

    if (!captain) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Captain not found" });
    }

    // Attach Captain to Request Object
    req.captain = captain;

    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Invalid or expired token" });
  }
};
