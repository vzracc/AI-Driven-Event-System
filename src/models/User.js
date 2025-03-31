import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["Admin", "Chairperson", "TeamMember", "Attendee"],
      required: true,
    },
    community: { type: mongoose.Schema.Types.ObjectId, ref: "Community" },
    team: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;