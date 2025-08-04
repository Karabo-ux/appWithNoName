const express = require('express');
const router = express.Router();
const Worker = require('../models/worker');

// GET workers by location and profession
router.get('/', async (req, res) => {
  const { location, profession } = req.query;

  let filter = {};
  if (location) filter.location = new RegExp(location, 'i');
  if (profession) filter.profession = profession;

  try {
    const workers = await Worker.find(filter);
    res.json(workers);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
