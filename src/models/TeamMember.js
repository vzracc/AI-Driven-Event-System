import mongoose from "mongoose";

const TeamMemberSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    team: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true },
  },
  { timestamps: true }
);

const TeamMember = mongoose.model("TeamMember", TeamMemberSchema);

export default TeamMember;