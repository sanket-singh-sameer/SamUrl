import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();

import connectToDB from "./src/config/mongo.config.js";
import urlSchema from "./src/models/shorturl.model.js";
import shortUrlRoute from "./src/routes/shorturl.route.js";
import { AppError, ExpressError } from "./src/utils/errorHandeler.js";
import { redirectShortUrl } from "./src/controllers/shorturl.controller.js";

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", shortUrlRoute);

app.get("/:shortId", async (req, res) => {
  const { shortId } = req.params;
  const url = await urlSchema.findOneAndUpdate(
    { shortUrl: shortId },
    { $inc: { views: 1 } }
  );
  if (url) {
    res.redirect(url.fullUrl);
  } else {
    res.send("Not Found!");
  }
});

app.use("/", (req, res, next) => {
  // next(new AppError("Page Not Found", 404));
  next(new ExpressError(404, "Page Not Found"));
});

app.use((err, req, res, next) => {
  let { statusCode = 505, message = "Something Went Wrong" } = err;
  res.json(err);
});

app.listen(PORT, () => {
  connectToDB("app.js");
  console.log(`App is listening to port ${PORT}`);
});
