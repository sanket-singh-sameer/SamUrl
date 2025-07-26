import {
  createShortUrlServiceWithUser,
  createShortUrlServiceWithoutUser,
} from "../services/shorturl.service.js";
import { wrapAsync } from "../utils/errorHandeler.js";

const createShortUrl = wrapAsync(async (req, res) => {
  const { url } = req.body;
  const finalShortUrl = await createShortUrlServiceWithoutUser(url);
  res.json(finalShortUrl);
});

const redirectShortUrl = wrapAsync();

export { createShortUrl,redirectShortUrl };
