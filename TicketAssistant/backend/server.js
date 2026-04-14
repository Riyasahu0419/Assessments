import express from "express";
import cors from "cors";
import ticketRoutes from "./routes/tickets.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/tickets", ticketRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
