import { verifyToken } from "./helper.js";
import User from "../models/user.model.js";

export const attachUser = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) {
    return next();
  }
  try {
    const decoded = verifyToken(accessToken);
    const user = await User.findById(decoded.id);
    if (!user) {
      return next();
    }
    req.currUser = user;
    return next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return next();
  }
};
