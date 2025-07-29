import urlSchema from "../models/shorturl.model.js";
import { ExpressError } from "../utils/errorHandeler.js";
import { wrapAsync } from "../utils/errorHandeler.js";
import mongoose from "mongoose";
const saveShortUrl = async (shortId, url, user) => {
  const newUrl = new urlSchema({
    fullUrl: url,
    shortUrl: shortId,
  });
  if (user) {
    newUrl.user = user._id;
  }
  const finalShortUrl = `${process.env.URL}${shortId}`;
  try {
    await newUrl.save();
    if (user) {
      console.log(
        `✅ Added: ${url} to ${finalShortUrl} for user ${user.email}`
      );
    } else {
      console.log(`✅ Added: ${url} to ${finalShortUrl} for anonymous user`);
    }
    return finalShortUrl;
  } catch (err) {
    console.log(`❌ Error : ${err.message}`);
    throw new ExpressError(505, `Please provide a valid value for "url"`);
  }
};
const getCustomShortId = async (slug) => {
  return await urlSchema.findOne({ shortUrl: slug });
};
const getUserUrls = async (userId) => {
  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }
  const urls = await urlSchema.find({ user: userId });

  if (!urls || urls.length === 0) {
    throw new ExpressError(404, "No URLs found for this user");
  }

  return urls;
};

export { saveShortUrl, getCustomShortId, getUserUrls };
