import express from "express";
import multer from "multer";
import {
  generateImage,
  analyzeImage,
} from "../controllers/imageController.js";

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/generate", generateImage);
router.post("/analyze", upload.single("image"), analyzeImage);

export default router;