import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate("community team");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("community team");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
