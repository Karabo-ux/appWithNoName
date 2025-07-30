const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// API routes FIRST
const workerRoutes = require('./routes/workers');
app.use('/api/workers', workerRoutes);

// Static files (only for frontend pages like index.html, etc)
app.use(express.static(path.join(__dirname, 'public')));

// Catch-all for undefined routes (404)
app.use((req, res) => {
  res.status(404).send('Page not found');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
