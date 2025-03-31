import express from "express";
import { 
  registerMember, 
  createTask, 
  getTasks, 
  updateTask, 
  deleteTask, 
  getRecommendations 
} from "../controllers/chairpersonController.js";
import { authenticateUser, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Route to register a team member
router.post("/member", authenticateUser, authorizeRoles("Chairperson"), registerMember);

// Route to create a task
router.post("/task", authenticateUser, authorizeRoles("Chairperson"), createTask);

// Route to get all tasks
router.get("/tasks", authenticateUser, authorizeRoles("Chairperson"), getTasks);

// Route to update a task
router.put("/task/:taskId", authenticateUser, authorizeRoles("Chairperson"), updateTask);

// Route to delete a task
router.delete("/task/:taskId", authenticateUser, authorizeRoles("Chairperson"), deleteTask);

// Route to get speaker and judge recommendations
router.post("/recommendations", authenticateUser, authorizeRoles("Chairperson"), getRecommendations);

export default router;