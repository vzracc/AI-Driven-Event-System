import express from "express";
import { authenticateUser, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Example feedback route with authentication and role-based authorization
router.get(
  "/",
  authenticateUser,
  authorizeRoles("admin", "user"), // Example roles
  (req, res) => {
    res.status(200).json({ message: "Feedback route accessed successfully" });
  }
);

export default router;