import express from "express";
const router = express.Router();
import { authMiddleware } from "../middlewares/auth.middleware.js";

import { signup, login } from "../controllers/auth.controller.js";

router.post("/register", signup);
router.post("/login", login);
router.get("/me", authMiddleware, (req, res) => {
    req.currUser.password = undefined; // Remove password from response
    req.currUser.__v = undefined; // Remove __v from response
  res.status(200).json({ user: req.currUser });
});

export default router;