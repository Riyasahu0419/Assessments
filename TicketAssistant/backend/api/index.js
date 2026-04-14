import express from "express";
import cors from "cors";
import ticketRoutes from "../routes/tickets.js";

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://assessments-9y3b.vercel.app",
  ],
  methods: ["GET", "POST"],
}));
app.use(express.json());

// Vercel routes /api/tickets/* here, so mount at /tickets
app.use("/tickets", ticketRoutes);

export default app;
