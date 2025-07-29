import express from "express";
const router = express.Router();

import { signup, login } from "../controllers/auth.controller.js";

router.post("/register", signup);
router.post("/login", login);

export default router;