import { v4 as uuidv4 } from "uuid";

let tickets = [];

export const createTicket = (data) => {
  const newTicket = {
    ticketId: "tkt_" + uuidv4(),
    ...data,
    status: "OPEN",
    category: null,
    aiReply: null,
    createdAt: new Date().toISOString(),
  };

  tickets.push(newTicket);
  return newTicket;
};

export const getTickets = () => tickets;

export const getTicketById = (id) =>
  tickets.find((t) => t.ticketId === id);

export const updateTicket = (id, updates) => {
  const ticket = getTicketById(id);
  if (!ticket) return null;

  Object.assign(ticket, updates);
  return ticket;
};