import express from "express";
import Mentorship from "../Models/Mentorship.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const mentorships = await Mentorship.find();
    res.json(mentorships);
  } catch (err) {
    res.status(500).json({ error: "Server error while fetching mentorships" });
  }
});

export default router;
