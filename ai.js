const express = require('express');
const router = express.Router();

// Sample short diet motivation replies
const responses = [
    "Every healthy choice you make is a step toward a stronger you 🥗",
    "Fuel your body, nourish your soul 🌟",
    "Small changes create big results — trust the process 💚",
    "Consistency over perfection! You've got this 💪",
    "Eating well is a form of self-respect 🍎",
    "One meal at a time, one step closer to your goals 🚀",
    "Your future self will thank you for today’s efforts 🌱",
    "Healthy habits build a healthy life 🌿",
    "Progress, not perfection — keep moving forward! ✨"
];

router.post('/', (req, res) => {
    const randomIndex = Math.floor(Math.random() * responses.length);
    const botReply = responses[randomIndex];
    res.json({ response: botReply });
});

module.exports = router;
