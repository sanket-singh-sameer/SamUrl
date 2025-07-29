import { generateNanoId } from "../utils/helper.js";
import { saveShortUrl } from "../dao/shorturl.dao.js";
import { getCustomShortId } from "../dao/shorturl.dao.js";
import { ExpressError } from "../utils/errorHandeler.js";
const createShortUrlServiceWithUser = async (url, slug, user) => {
  const exists = await getCustomShortId(slug);
  if (exists) {
    throw new ExpressError(
      400,
      "This custom short URL already exists. Please choose a different one."
    );
  }
  const shortId = slug || generateNanoId(7);
  const finalShortUrl = saveShortUrl(shortId, url, user);
  return finalShortUrl;
};
const createShortUrlServiceWithoutUser = (url) => {
  const shortId = generateNanoId();
  const finalShortUrl = saveShortUrl(shortId, url);
  return finalShortUrl;
};

export { createShortUrlServiceWithUser, createShortUrlServiceWithoutUser };
