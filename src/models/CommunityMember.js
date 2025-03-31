const mongoose = require("mongoose");

const CommunityMemberSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  community: { type: mongoose.Schema.Types.ObjectId, ref: "Community", required: true },
  role: { 
    type: String, 
    enum: ["Chairperson", "Member"], 
    required: true 
  }
}, { timestamps: true });

module.exports = mongoose.model("CommunityMember", CommunityMemberSchema);