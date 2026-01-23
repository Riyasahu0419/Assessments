const express = require('express');
const Database = require('better-sqlite3');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// 1. DB INIT
const db = new Database('database.sqlite');
db.exec(`
  CREATE TABLE IF NOT EXISTS employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT, department TEXT, role TEXT, status TEXT DEFAULT 'Active'
  );
  CREATE TABLE IF NOT EXISTS lifecycle_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    employee_id INTEGER, event_type TEXT, notes TEXT, effective_date TEXT
  );
`);

// Seed if empty
const count = db.prepare("SELECT COUNT(*) as c FROM employees").get().c;
if (count === 0) {
    db.prepare("INSERT INTO employees (name, department, role) VALUES (?, ?, ?)")
      .run("Alice Johnson", "Engineering", "Senior Dev");
    console.log("Database seeded.");
}

// 2. API ROUTES
app.get('/api/employees', (req, res) => {
    const rows = db.prepare("SELECT * FROM employees").all();
    res.json(rows);
});

app.get('/api/employees/:id', (req, res) => {
    const row = db.prepare("SELECT * FROM employees WHERE id = ?").get(req.params.id);
    res.json(row || { error: "Not found" });
});

app.get('/api/employees/:id/lifecycle', (req, res) => {
    const rows = db.prepare("SELECT * FROM lifecycle_events WHERE employee_id = ?").all(req.params.id);
    res.json(rows);
});

app.post('/api/employees/:id/lifecycle', (req, res) => {
    const { event_type, notes, effective_date } = req.body;
    db.prepare("INSERT INTO lifecycle_events (employee_id, event_type, notes, effective_date) VALUES (?, ?, ?, ?)")
      .run(req.params.id, event_type, notes, effective_date);
    res.sendStatus(201);
});

// 3. THE FIX: Catch-all for Frontend (using Regex)
app.get(/^((?!\/api).)*$/, (req, res) => {
    res.send("API Server is running. Access endpoints at /api/employees");
});

app.listen(PORT, () => console.log(`Server live at http://localhost:${PORT}`));