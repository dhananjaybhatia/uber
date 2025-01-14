import express from "express";
const router = express.Router();
import { body, query } from "express-validator";
import { createRide, getCalculatedFare } from "../controllers/ride.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

router.post(
  "/create",
  authUser,
  body("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid origin address"),
  body("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid destination address"),
  body("vehicleType")
    .isString()
    .isIn(["car", "auto", "moto"])
    .withMessage("Invalid VehicleType"),
  createRide
);

router.get("/get-fare", authUser, 
  query('pickup').isString().isLength({min: 3}).withMessage('Invalid pickup'),
  query('destination').isString().isLength({min: 3}).withMessage('Invalid destination'),
  getCalculatedFare)

export default router;
