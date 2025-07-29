import User from "../models/user.model.js";
import { ExpressError, wrapAsync } from "../utils/errorHandeler.js";

const findUserByEmail = wrapAsync(async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new ExpressError(404, "User not found");
  }
  return user;
});