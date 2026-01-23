# HR Employee Lifecycle & Audit System

## Project Overview
This application is a proof-of-concept tool for HR departments to track employee details and their professional lifecycle events (e.g., hiring, promotions, departmental transfers). It features a searchable employee directory and a detailed audit trail for each staff member.

## Tech Stack
- **Frontend:** React.js (Hooks, Functional Components)
- **Backend:** Node.js, Express.js
- **Database:** SQLite (Self-initializing)
- **Styling:** Standard CSS-in-JS (for simplicity/portability)

## How to Run
1. **Backend:**
   - Navigate to `/backend`
   - Install: `npm install`
   - Start: `node server.js`
   - The server will run on port 5000 and initialize `database.sqlite` automatically.

2. **Frontend:**
   - Navigate to `/frontend`
   - Install: `npm install`
   - Start: `npm run dev`
   - Access via `http://localhost:3000`

## Assumptions and Limitations
- **No Auth:** As per requirements, the system is open. In a production environment, JWT or Session-based auth would be mandatory.
- **SQLite:** Chosen for its zero-config nature. It is ideal for this assessment but should be swapped for PostgreSQL for high-concurrency production environments.
- **Lifecycle Events:** Adding an event currently does not automatically change the `status` or `role` in the `employees` table (e.g., adding a "Promotion" event doesn't update the role). This is kept separate to maintain a pure audit trail vs. current state.

## Future Improvements
- **Real-time Status Updates:** Implement database triggers or backend logic to update the main employee record when a lifecycle event (like 'Termination') is added.
- **Search:** Add a text-based search for employee names.
- **Data Validation:** Implement a library like Joi or Zod on the backend for more robust schema validation.
- **UI/UX:** Integrate a component library like Tailwind CSS or Material UI for a polished look.