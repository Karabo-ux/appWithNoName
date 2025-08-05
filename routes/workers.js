const express = require('express');
const router = express.Router();
const Worker = require('../models/worker');

// Create a new worker profile (no image upload)
router.post('/', async (req, res) => {
  try {
    const { name, profession, location, bio, contact } = req.body;

    const newWorker = new Worker({
      name,
      profession,
      location,
      bio,
      contact,
      profilePicUrl: '', // empty for now
      proofs: []          // empty for now
    });

    await newWorker.save();
    res.status(201).json({ message: 'Worker created', worker: newWorker });
  } catch (err) {
    console.error('Error saving worker:', err);
    res.status(500).json({ message: 'Error saving worker' });
  }
});

router.get('/', async (req, res) => {
  try {
    const { location, profession } = req.query;
    const filter = {};
    if (location) filter.location = new RegExp(location, 'i');
    if (profession) filter.profession = new RegExp(profession, 'i');
    const workers = await Worker.find(filter);
    res.json(workers);
  } catch (error) {
    console.error('Error fetching workers:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
