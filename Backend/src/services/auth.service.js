import { ExpressError, wrapAsync } from "../utils/errorHandeler.js";
const User = (await import("../models/user.model.js")).default;
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/helper.js";

const registerUser = async (username, email, password) => {
  if (!username || !email || !password) {
    throw new ExpressError(400, "All fields are required");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ExpressError(409, "User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  if (!hashedPassword) {
    throw new ExpressError(500, "Error hashing password");
  }

  const user = new User({ username, email, password: hashedPassword });
  await user.save();

  const accessToken = generateToken(user);
  
  return { user, accessToken };
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new ExpressError(404, "User not found");
  } else {
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new ExpressError(401, "Invalid credentials");
    }
  }

  const accessToken = generateToken(user);
  return { user, accessToken };
};

export { registerUser, loginUser };
