import express from "express";
import multer from "multer";
import {
  generateImage,
  analyzeImage,
} from "../controllers/imageController.js";

const router = express.Router();

// Use memory storage — Vercel filesystem is read-only
const upload = multer({ storage: multer.memoryStorage() });

router.post("/generate", generateImage);
router.post("/analyze", upload.single("image"), analyzeImage);

export default router;