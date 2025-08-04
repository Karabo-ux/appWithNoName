const express = require('express');
const router = express.Router();
const Worker = require('../models/worker'); // Check path and capitalization

router.get('/', async (req, res) => {
  const { location, skill } = req.query;
  try {
    const filter = {};
    if (location) filter.location = { $regex: location, $options: 'i' };
    if (skill) filter.skill = { $regex: skill, $options: 'i' };
    const workers = await Worker.find(filter);
    res.json(workers);
  } catch (error) {
    console.error('Error fetching workers:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
