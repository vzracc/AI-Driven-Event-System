import mongoose from "mongoose";

const CollegeSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    unique: true 
  },
  location: { 
    type: String, 
    required: true 
  }
}, { timestamps: true });

const College = mongoose.model("College",CollegeSchema);
export default College