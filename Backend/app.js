import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();

import connectToDB from "./src/config/mongo.config.js";
import urlSchema from "./src/models/shorturl.model.js";
import shortUrlRoute from "./src/routes/shorturl.route.js";
import { AppError, ExpressError } from "./src/utils/errorHandeler.js";
import userRoute from "./src/routes/auth.route.js";
import cors from "cors";
import { attachUser } from "./src/utils/attachUser.js";
import cookieParser from "cookie-parser";
import { redirectShortUrl } from "./src/controllers/shorturl.controller.js";

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true
}));
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(attachUser);

app.get("/", (req, res) => {
  res.send("Welcome to SamUrl HomeRoute");
});

app.use("/user", userRoute);
app.use("/api", shortUrlRoute);

app.get("/:shortId", redirectShortUrl);

app.use("/", (req, res, next) => {
  // next(new AppError("Page Not Found", 404));
  next(new ExpressError(404, "Page Not Found"));
});

// Example error handler
app.use((err, req, res, next) => {
  if (res.headersSent) {
    console.error("Headers already sent. Skipping response.");
    return;
  }

  const status = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json({ error: message });
});

app.listen(PORT, () => {
  connectToDB("app.js");
  console.log(`App is listening to port ${PORT}`);
});
