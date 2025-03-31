import College from "../models/College.js";
import Community from "../models/Community.js";
import Event from "../models/Event.js";

export const registerCollege = async (req, res) => {
  try {
    const { name, adminName, identityKey, location } = req.body;

    const college = new College({ name, adminName, identityKey , location});
    await college.save();

    res.status(201).json({ message: "College registered successfully", college });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const registerCommunity = async (req, res) => {
  try {
    const { name, collegeId, chairperson } = req.body;

    const community = new Community({ name, college: collegeId, chairperson });
    await community.save();

    res.status(201).json({ message: "Community registered successfully", community });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const registerEvent = async (req, res) => {
  try {
    // Ensure only Admins can create events
    if (req.user.role !== "Admin") {
      return res.status(403).json({ message: "Only Admins can create events" });
    }

    const { name, date, location, communityId } = req.body;

    const event = new Event({ name, date, location, community: communityId });
    await event.save();

    res.status(201).json({ message: "Event registered successfully", event });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
