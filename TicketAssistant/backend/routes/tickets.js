import express from "express";
import {
  createTicket,
  getTickets,
  getTicketById,
  updateTicket,
} from "../models/ticketStore.js";

import { processTicketWithAI } from "../services/aiService.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, description } = req.body;

  const ticket = createTicket({ name, email, description });

  // AI Processing
  const aiData = await processTicketWithAI(description);

  updateTicket(ticket.ticketId, {
    category: aiData.category,
    aiReply: aiData.reply,
    confidence: aiData.confidence,
  });

  res.json({ ticketId: ticket.ticketId, status: ticket.status });
});

router.get("/", (req, res) => {
  res.json(getTickets());
});

router.get("/:id", (req, res) => {
  const ticket = getTicketById(req.params.id);
  if (!ticket) return res.status(404).send("Not found");

  res.json(ticket);
});

router.post("/:id/status", (req, res) => {
  updateTicket(req.params.id, { status: req.body.status });
  res.json({ success: true });
});

router.post("/:id/reply", (req, res) => {
  updateTicket(req.params.id, { aiReply: req.body.reply });
  res.json({ success: true });
});

export default router;