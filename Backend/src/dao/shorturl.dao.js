import urlSchema from "../models/shorturl.model.js";
import { ExpressError } from "../utils/errorHandeler.js";

const saveShortUrl = async (shortId, url, userId) => {
  const newUrl = new urlSchema({
    fullUrl: url,
    shortUrl: shortId,
  });
  if (userId) {
    newUrl.userId = userId;
  }
  const finalShortUrl = `${process.env.URL}${shortId}`;
  try {
    await newUrl
      .save()
      console.log(`✅ Added: ${url} to ${finalShortUrl}`);
      return finalShortUrl;
  } catch (err) {
    console.log(`❌ Error : ${err.message}`);
    throw new ExpressError(505,`Please provide a valid value for "url"`)
  }
};

export { saveShortUrl };
