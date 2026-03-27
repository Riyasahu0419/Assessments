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

import textRoutes from "./routes/textRoutes.js";
import imageRoutes from "./routes/imageRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/text", textRoutes);
app.use("/api/image", imageRoutes);

// For local development
if (process.env.NODE_ENV !== "production") {
  app.listen(5000, () => console.log("Server running on port 5000"));
}

export default app;