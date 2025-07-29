import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";

const generateNanoId = () => {
  return nanoid(7);
};

const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};
const verifyToken = (accessToken) => {
  try {
    return jwt.verify(accessToken, process.env.JWT_SECRET);
  } catch (error) {
    throw new ExpressError(401, "Invalid Token");
  }
};

export { generateNanoId, generateToken, verifyToken };
