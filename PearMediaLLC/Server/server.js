// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";

// import textRoutes from "./routes/textRoutes.js";
// import imageRoutes from "./routes/imageRoutes.js";

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.use("/api/text", textRoutes);
// app.use("/api/image", imageRoutes);

// app.listen(5000, () => console.log("Server running"));







import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import textRoutes from "./routes/textRoutes.js";
import imageRoutes from "./routes/imageRoutes.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Create uploads folder if it doesn't exist yet
const uploadsDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log("Created uploads/ directory");
}

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/text", textRoutes);
app.use("/api/image", imageRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));