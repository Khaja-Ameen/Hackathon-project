const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// --- DATABASE CONNECTION ---
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: '', 
    database: 'wellness_hub'
});

db.connect(err => {
    if (err) console.error('❌ Database error:', err);
    else console.log('✅ Connected to MySQL Database');
});

// --- API ROUTES ---

// 1. REGISTER
app.post('/api/register', (req, res) => {
    const { name, email, password } = req.body;
    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    db.query(sql, [name, email, password], (err, result) => {
        if (err) return res.status(500).json({ error: "Email exists" });
        res.json({ id: result.insertId, name, email });
    });
});

// 2. LOGIN
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
    db.query(sql, [email, password], (err, results) => {
        if (err || results.length === 0) return res.status(401).json({ error: "Invalid credentials" });
        const user = results[0];
        res.json({ id: user.id, name: user.name, email: user.email });
    });
});

// 3. GET GOALS
app.get('/api/goals/:userId', (req, res) => {
    db.query("SELECT * FROM goals WHERE user_id = ?", [req.params.userId], (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// 4. ADD GOAL
app.post('/api/goals', (req, res) => {
    const { title, category, target, current, userId } = req.body;
    const sql = "INSERT INTO goals (title, category, target, current, user_id) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [title, category, target, current, userId], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ id: result.insertId, title, category, target, current, user_id: userId });
    });
});

// 5. UPDATE GOAL
app.put('/api/goals/:id', (req, res) => {
    const { title, current } = req.body;
    const sql = "UPDATE goals SET title = ?, current = ? WHERE id = ?";
    db.query(sql, [title, current, req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Updated" });
    });
});

// 6. DELETE GOAL
app.delete('/api/goals/:id', (req, res) => {
    db.query("DELETE FROM goals WHERE id = ?", [req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Deleted" });
    });
});

// 7. GET RESOURCES (Updated to fetch URL/Thumbnail)
app.get('/api/resources', (req, res) => {
    db.query("SELECT * FROM resources", (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// 8. LOG USER ACTIVITY
app.post('/api/logs', (req, res) => {
    const { userId, resourceId, logType } = req.body;
    const sql = "INSERT INTO user_logs (user_id, resource_id, log_type) VALUES (?, ?, ?)";
    db.query(sql, [userId, resourceId, logType], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Logged successfully", id: result.insertId });
    });
});

app.listen(5000, () => { console.log("🚀 Server running on port 5000"); });