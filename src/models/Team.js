import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    community: { type: mongoose.Schema.Types.ObjectId, ref: "Community", required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const Team = mongoose.model("Team", TeamSchema);

export default Team;