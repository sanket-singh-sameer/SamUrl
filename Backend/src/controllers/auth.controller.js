import { registerUser, loginUser } from "../services/auth.service.js";
import { wrapAsync } from "../utils/errorHandeler.js";
import { ExpressError } from "../utils/errorHandeler.js";

const isProd = process.env.NODE_ENV === "production";

const signup = wrapAsync(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    throw new ExpressError(400, "Fields are required");
  }

  const { user, accessToken } = await registerUser(username, email, password);
  if (!user) throw new ExpressError(500, "Error creating user");
  if (!accessToken) throw new ExpressError(500, "Error generating token");
  const alreadyToken = req.cookies.accessToken;
  if (alreadyToken) {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      path: "/",
    });
  }

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/",
  });
  console.log("✅ New user created:", user);
  return res.status(201).json({ accessToken });
});

const login = wrapAsync(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ExpressError(400, "All fields are required");
  }

  const { user, accessToken } = await loginUser(email, password);

  const existingToken = req.cookies.accessToken;
  if (existingToken) {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      path: "/",
    });
  }

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/",
  });

  return res.status(200).json({ accessToken });
});



export { login, signup };
