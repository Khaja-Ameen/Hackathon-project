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

// --- API ROUTES (Auth, Goals, Resources, Activity) ---

// AUTHENTICATION ROUTES (1 & 2)
app.post('/api/register', (req, res) => {
    const { name, email, password } = req.body;
    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    db.query(sql, [name, email, password], (err, result) => {
        if (err) return res.status(500).json({ error: "Email exists" });
        res.json({ id: result.insertId, name, email });
    });
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
    db.query(sql, [email, password], (err, results) => {
        if (err || results.length === 0) return res.status(401).json({ error: "Invalid credentials" });
        const user = results[0];
        res.json({ id: user.id, name: user.name, email: user.email });
    });
});

// GOALS ROUTES (3, 4, 5, 6)
app.get('/api/goals/:userId', (req, res) => {
    db.query("SELECT * FROM goals WHERE user_id = ?", [req.params.userId], (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

app.post('/api/goals', (req, res) => {
    const { title, category, target, current, userId } = req.body;
    const sql = "INSERT INTO goals (title, category, target, current, user_id) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [title, category, target, current, userId], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ id: result.insertId, title, category, target, current, user_id: userId });
    });
});

app.put('/api/goals/:id', (req, res) => {
    const { title, current } = req.body;
    const sql = "UPDATE goals SET title = ?, current = ? WHERE id = ?";
    db.query(sql, [title, current, req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Updated" });
    });
});

app.delete('/api/goals/:id', (req, res) => {
    db.query("DELETE FROM goals WHERE id = ?", [req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Deleted" });
    });
});

// RESOURCE & LOGGING ROUTES (7, 8, 9)
app.get('/api/resources', (req, res) => {
    db.query("SELECT * FROM resources", (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

app.post('/api/logs', (req, res) => {
    const { userId, resourceId, logType } = req.body;
    const sql = "INSERT INTO user_logs (user_id, resource_id, log_type) VALUES (?, ?, ?)";
    db.query(sql, [userId, resourceId, logType], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Logged successfully", id: result.insertId });
    });
});

// ACTIVITY ROUTES (10, 11) - FIXING THE FAILURE
app.get('/api/activity/:userId', (req, res) => {
    db.query("SELECT * FROM activity_logs WHERE user_id = ? ORDER BY log_date DESC", [req.params.userId], (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

app.post('/api/activity', (req, res) => {
    const { userId, type, duration, calories } = req.body;
    const sql = "INSERT INTO activity_logs (user_id, activity_type, duration_min, calories_burned) VALUES (?, ?, ?, ?)";
    db.query(sql, [userId, type, duration, calories], (err, result) => {
        if (err) {
            console.error("SQL Error on Activity POST:", err);
            return res.status(500).json({ error: "Failed to insert activity log into database." });
        }
        // Send back necessary fields for frontend history
        res.json({ id: result.insertId, user_id: userId, activity_type: type, duration_min: duration, calories_burned: calories, log_date: new Date().toISOString() });
    });
});


app.listen(5000, () => { console.log("🚀 Server running on port 5000"); });
// --- New Dashboard Stats Route ---

// 9. GET DASHBOARD SUMMARY STATS
app.get('/api/stats/summary/:userId', (req, res) => {
    const userId = req.params.userId;
    // Calculate total goals met and total activity logged in the last 7 days
    const sql = `
        SELECT
            (SELECT COUNT(*) FROM goals WHERE user_id = ? AND current >= target) AS total_goals_met,
            (SELECT SUM(calories_burned) FROM activity_logs WHERE user_id = ? AND log_date >= DATE_SUB(NOW(), INTERVAL 7 DAY)) AS weekly_calories,
            (SELECT activity_type FROM activity_logs WHERE user_id = ? ORDER BY log_date DESC LIMIT 1) AS last_activity_type;
    `;
    
    // Note: We run the same query three times with different parameters for simplicity,
    // but a JOIN or UNION might be more efficient in production SQL.
    db.query(sql, [userId, userId, userId], (err, results) => {
        if (err) {
            console.error("SQL Error fetching summary:", err);
            return res.status(500).json({ error: "Failed to fetch dashboard summary" });
        }
        
        // Results are typically returned as an array of objects
        const stats = results[0]; 
        
        res.json({
            // Ensure fields are extracted correctly based on the SQL query aliases
            totalGoalsMet: stats[0].total_goals_met || 0,
            weeklyCalories: stats[1].weekly_calories || 0,
            lastActivityType: stats[2].last_activity_type || 'None'
        });
    });
});