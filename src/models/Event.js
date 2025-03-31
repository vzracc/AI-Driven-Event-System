import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String 
  },
  date: { 
    type: Date, 
    required: true 
  },
  location: { 
    type: String, 
    required: true 
  },
  community: {
     type: mongoose.Schema.Types.ObjectId, 
     ref: "Community", 
     required: true 
    },
  attendees: [{
     type: mongoose.Schema.Types.ObjectId,
     ref: "User" 
    }]
}, { timestamps: true });

const Event = mongoose.model("Event", EventSchema);
export default Event