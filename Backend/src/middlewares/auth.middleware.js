import User from "../models/user.model.js";
import { ExpressError, wrapAsync } from "../utils/errorHandeler.js";
import { verifyToken } from "../utils/helper.js";

export const protect = wrapAsync(async (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  console.log("Token:", accessToken);
  if(!accessToken){
    throw new ExpressError(401, "You are not logged in");
  }
  if (accessToken) {
    const decoded = verifyToken(accessToken);
    req.currUser = await User.findById(decoded.id);
  }
  next();
});
