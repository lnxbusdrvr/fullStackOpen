// backend/server.js
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json()); // For parsing application/json

app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello from backend!' });
});

app.post('/api/data', (req, res) => {
  console.log('Vastaanotettu data:', req.body);
  res.json({ message: 'Data revieved succesfully!' });
});

const server = app.listen(port, () => {
  console.log(`Backend-server runs on port ${port}`);
});


module.exports = { app, server };
