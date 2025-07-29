import {
  createShortUrlServiceWithUser,
  createShortUrlServiceWithoutUser,
} from "../services/shorturl.service.js";
import { wrapAsync } from "../utils/errorHandeler.js";
import { ExpressError } from "../utils/errorHandeler.js";
import urlSchema from "../models/shorturl.model.js";

const createShortUrl = wrapAsync(async (req, res) => {
  console.log(req.currUser);
  if (req.currUser) {
    const { url, slug } = req.body;
    if (!slug || slug.length < 3) {
      throw new ExpressError(400, "Slug must be at least 3 characters long");
    }
    const finalShortUrl = await createShortUrlServiceWithUser(
      url,
      slug,
      req.currUser
    );
    res.json(finalShortUrl);
    return; 
  } else {
    const { url } = req.body;
    const finalShortUrl = await createShortUrlServiceWithoutUser(url);
    res.json(finalShortUrl);
    return;
  }
});
const redirectShortUrl = wrapAsync(async (req, res) => {
  const { shortId } = req.params;
  const url = await urlSchema.findOneAndUpdate(
    { shortUrl: shortId },
    { $inc: { views: 1 } }
  );
  if (url) {
    res.redirect(url.fullUrl);
    return;
  } else {
    res.status(404).send("Not Found!");
    return;
  }
});
export { createShortUrl, redirectShortUrl };
