import mongoose from "mongoose";

const mentorshipSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  mentorName: { type: String },
  postedAt: { type: Date, default: Date.now }
});

export default mongoose.model("Mentorship", mentorshipSchema);
