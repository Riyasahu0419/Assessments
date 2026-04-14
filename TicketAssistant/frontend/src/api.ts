const BASE_URL = import.meta.env.VITE_API_URL ?? 'https://assessments-rfis.vercel.app'

export const createTicket = (data: object) =>
  fetch(`${BASE_URL}/api/tickets`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(res => res.json())

export const getTickets = () =>
  fetch(`${BASE_URL}/api/tickets`).then(res => res.json())

export const getTicket = (id: string) =>
  fetch(`${BASE_URL}/api/tickets/${id}`).then(res => res.json())

export const updateStatus = (id: string, status: string) =>
  fetch(`${BASE_URL}/api/tickets/${id}/status`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  }).then(res => res.json())

export const updateReply = (id: string, reply: string) =>
  fetch(`${BASE_URL}/api/tickets/${id}/reply`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ reply }),
  }).then(res => res.json())
