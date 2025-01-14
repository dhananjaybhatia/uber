import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./database/db.js";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/user.routes.js";
import captainRoutes from "./routes/captain.routes.js";
import mapRoutes from "./routes/maps.routes.js";
import rideRoutes from "./routes/ride.routes.js";

const app = express();
connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/users", userRoutes);
app.use("/captains", captainRoutes);
app.use("/maps", mapRoutes);
app.use("/rides", rideRoutes);

app.get("/", (req, res) => {
  res.send("hello");
});

export default app;
