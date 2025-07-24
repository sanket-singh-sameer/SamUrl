
import { generateNanoId } from "../utils/helper.js";
import { saveShortUrl } from "../dao/shorturl.dao.js";


const createShortUrlServiceWithUser = (url, userId) => {
  const shortId = generateNanoId();
  const finalShortUrl = saveShortUrl(shortId, url, userId);
  return finalShortUrl;
};
const createShortUrlServiceWithoutUser = (url) => {
  const shortId = generateNanoId();
  const finalShortUrl = saveShortUrl(shortId, url);
  return finalShortUrl;
};


export { createShortUrlServiceWithUser , createShortUrlServiceWithoutUser};
