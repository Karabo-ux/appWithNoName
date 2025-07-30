const express = require('express');
const router = express.Router();
const Worker = require('../models/worker');

// GET /api/workers — All or filtered
router.get('/', async (req, res) => {
  try {
    const { profession, location } = req.query;
    let filter = {};
    if (profession) filter.profession = profession;
    if (location) filter.location = new RegExp(location, 'i');
    const workers = await Worker.find(filter);
    res.json(workers);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/workers/:id — One worker by ID
router.get('/:id', async (req, res) => {
  try {
    const worker = await Worker.findById(req.params.id);
    if (!worker) return res.status(404).json({ error: 'Worker not found' });
    res.json(worker);
  } catch (err) {
    console.error('Error fetching worker:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
