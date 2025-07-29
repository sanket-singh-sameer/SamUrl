import urlSchema from "../models/shorturl.model.js";
import { ExpressError } from "../utils/errorHandeler.js";

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
    if(user){
      console.log(`✅ Added: ${url} to ${finalShortUrl} for user ${user.email}`);
    }else{
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

export { saveShortUrl, getCustomShortId };
