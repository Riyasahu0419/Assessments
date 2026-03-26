import express from "express";
import { enhanceText } from "../controllers/textController.js";

const router = express.Router();

router.post("/enhance", enhanceText);

export default router;