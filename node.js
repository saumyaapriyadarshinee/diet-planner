const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Load users and feedback
const loadUsers = () => JSON.parse(fs.readFileSync('users.json', 'utf-8') || '[]');
const saveUsers = (users) => fs.writeFileSync('users.json', JSON.stringify(users, null, 2));

const loadFeedback = () => JSON.parse(fs.readFileSync('feedback.json', 'utf-8') || '[]');
const saveFeedback = (feedbacks) => fs.writeFileSync('feedback.json', JSON.stringify(feedbacks, null, 2));

// --- Auth: Register ---
app.post('/api/auth/register', async (req, res) => {
  const { username, password } = req.body;
  const users = loadUsers();

  if (users.find((u) => u.username === username)) {
    return res.status(409).json({ error: 'Username already exists' });
  }

  const hashed = await bcrypt.hash(password, 10);
  users.push({ username, password: hashed });
  saveUsers(users);

  res.json({ message: 'User registered successfully' });
});

// --- Auth: Login ---
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  const users = loadUsers();
  const user = users.find((u) => u.username === username);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ username }, process.env.SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
});

// --- Prediction (Mocked for now) ---
app.post('/api/predict', (req, res) => {
  const { stress, anxiety, burnout } = req.body;

  let riskLevel = 'Low';
  const score = stress + anxiety + burnout;
  if (score > 15) riskLevel = 'High';
  else if (score > 8) riskLevel = 'Moderate';

  res.json({ riskLevel });
});

// --- Feedback ---
app.post('/api/feedback', (req, res) => {
  const { username, message } = req.body;
  const feedbacks = loadFeedback();
  feedbacks.push({ username, message, timestamp: new Date().toISOString() });
  saveFeedback(feedbacks);

  res.json({ message: 'Feedback submitted' });
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
