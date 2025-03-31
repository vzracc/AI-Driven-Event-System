import Feedback from "../models/Feedback.js";
import Event from "../models/Event.js";
import User from "../models/User.js";

/**
 * Submit Feedback for an Event
 */
export const submitFeedback = async (req, res) => {
  try {
    const { eventId, rating, comment } = req.body;
    const userId = req.user.id; // Assuming user ID is stored in req.user from authentication middleware

    // Check if the event exists
    const eventExists = await Event.findById(eventId);
    if (!eventExists) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Ensure the user exists
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }

    // Save feedback
    const feedback = new Feedback({ event: eventId, user: userId, rating, comment });
    await feedback.save();

    res.status(201).json({ message: "Feedback submitted successfully", feedback });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

/**
 * Get Feedback for a Specific Event
 */
export const getEventFeedback = async (req, res) => {
  try {
    const { eventId } = req.params;

    const feedbacks = await Feedback.find({ event: eventId }).populate("user", "name email");
    if (!feedbacks.length) {
      return res.status(404).json({ message: "No feedback found for this event" });
    }

    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

/**
 * Get All Feedback from All Events (Admin Use)
 */
export const getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate("event", "name").populate("user", "name email");
    
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
