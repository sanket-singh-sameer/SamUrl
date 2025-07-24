import mongoose from "mongoose";
// import connectToDB from "../config/mongo.config.js";
// connectToDB("./src/models/shorturl.model.js");

const modelName = "Url";

const urlSchema = new mongoose.Schema({
  fullUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  User: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  views: {
    type: Number,
    required: true,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Url = mongoose.model(modelName, urlSchema);

export default Url;
