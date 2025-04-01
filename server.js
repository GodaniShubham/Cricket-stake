const express = require('express');
const bodyParser = require('body-parser');
const XLSX = require('xlsx');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to parse JSON data
app.use(bodyParser.json());

// Store score data in-memory (this can be replaced with a database if needed)
let scoreData = [];

// Endpoint to log a score when a player hits a six
app.post('/api/log-six', (req, res) => {
    const { player, score, date } = req.body;

    scoreData.push({ date, player, score });

    // Create Excel file after each score logging
    const ws = XLSX.utils.json_to_sheet(scoreData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Score Data');
    XLSX.writeFile(wb, 'Cricket_Score_Data.xlsx');

    res.json({ message: 'Score logged successfully', scoreData });
});

// Serve static files if you have a frontend (optional)
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
