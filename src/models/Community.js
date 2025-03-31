import mongoose from "mongoose";

const CommunitySchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    unique: true 
  },
  college: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "College", 
    required: true 
  },
  chairperson: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  teams: [{ type: mongoose.Schema.Types.ObjectId, ref: "Team" }]
}, { timestamps: true });

const Community = mongoose.model("Community", CommunitySchema);
export default Community