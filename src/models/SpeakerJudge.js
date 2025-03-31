import mongoose from "mongoose";

const SpeakerJudgeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  expertise: [String], // Array of themes/topics they specialize in
  availability: { type: [Date], required: true }, // Dates they are available
  fee: { type: Number, required: true }, // Fee for their services
  type: { type: String, enum: ["Speaker", "Judge"], required: true }, // Either "Speaker" or "Judge"
});

export default mongoose.model("SpeakerJudge", SpeakerJudgeSchema);