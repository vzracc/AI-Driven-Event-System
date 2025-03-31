import Task from "../models/Task.js";
import SpeakerJudge from "../models/SpeakerJudge.js";
import TeamMember from "../models/TeamMember.js"; // Import TeamMember model
import User from "../models/User.js"; // Import User model
import Team from "../models/Team.js"; // Import Team model
import { generateTaskAssignment } from "../utils/taskAutomation.js";
import { recommendSpeakersAndJudges } from "../utils/recommendation.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, createdBy } = req.body;

    // AI assigns the task to the most suitable team
    const assignedTeam = await generateTaskAssignment(description);

    if (!assignedTeam) {
      return res.status(500).json({ message: "Failed to assign task to a team." });
    }

    const newTask = new Task({ title, description, assignedTo: assignedTeam, createdBy });
    await newTask.save();

    res.status(201).json({ message: "Task created and assigned successfully", newTask });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate("assignedTo");
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const updates = req.body;

    const updatedTask = await Task.findByIdAndUpdate(taskId, updates, { new: true });

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task updated successfully", updatedTask });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getRecommendations = async (req, res) => {
  try {
    const { theme, budget, eventDate } = req.body;

    // Validate input
    if (!theme || !budget || !eventDate) {
      return res.status(400).json({ message: "Theme, budget, and event date are required." });
    }

    // Fetch recommendations
    const recommendations = await SpeakerJudge.find({
      expertise: { $in: [theme] }, // Match the theme
      fee: { $lte: budget }, // Within the budget
      availability: { $in: [new Date(eventDate)] }, // Available on the event date
    });

    res.status(200).json({ message: "Recommendations fetched successfully", recommendations });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Register a new team member
export const registerMember = async (req, res) => {
  try {
    const { userId, teamId } = req.body;

    if (!userId || !teamId) {
      return res.status(400).json({ message: "User ID and Team ID are required." });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ message: "Team not found." });
    }

    const existingMember = await TeamMember.findOne({ user: userId, team: teamId });
    if (existingMember) {
      return res.status(400).json({ message: "User is already a member of this team." });
    }

    const newTeamMember = new TeamMember({ user: userId, team: teamId });
    await newTeamMember.save();

    res.status(201).json({ message: "Team member registered successfully", newTeamMember });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
