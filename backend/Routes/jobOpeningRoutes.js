const express = require('express');
const JobOpening = require('../models/JobOpening');

const router = express.Router();

// GET all job openings
router.get("/", async (req, res) => {
  try {
    const jobs = await JobOpening.find();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new job opening
router.post("/", async (req, res) => {
  try {
    const newJob = new JobOpening(req.body);
    await newJob.save();
    res.status(201).json(newJob);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
