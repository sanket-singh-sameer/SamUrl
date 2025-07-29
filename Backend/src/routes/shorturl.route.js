import express from "express"
const router = express.Router()
import {createShortUrl} from "../controllers/shorturl.controller.js"
import { getUserUrls } from "../dao/shorturl.dao.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";


router.post("/create", createShortUrl);
router.get("/urls/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const urls = await getUserUrls(userId);
    res.json(urls);
  } catch (error) {
    console.error("Error fetching user URLs:", error);
    res.status(500).json({ error: "Failed to fetch URLs" });
  }
});

export default router;