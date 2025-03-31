import Event from "../models/Event.js";

export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("community");
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate("community");
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
