const express = require('express');
const router = express.Router();
const Worker = require('../models/worker');

router.get('/', async (req, res) => {
  const { location, skill } = req.query;
  try {
    const filter = {};
    if (location) filter.location = { $regex: location, $options: 'i' };
    if (skill) filter.profession = { $regex: skill, $options: 'i' }; // fix here
    const workers = await Worker.find(filter);
    res.json(workers);
  } catch (error) {
    console.error('Error fetching workers:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const worker = new Worker(req.body);
    await worker.save();
    res.status(201).json(worker);
  } catch (error) {
    console.error('Error creating worker:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
