import express from "express"
const router = express.Router()
import {createShortUrl} from "../controllers/shorturl.controller.js"


router.post("/create", createShortUrl);


export default router;