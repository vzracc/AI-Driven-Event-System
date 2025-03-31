import express from "express";
import { createTask, getTasks, updateTask, deleteTask } from "../controllers/chairpersonController.js";

const router = express.Router();

// Define routes
router.post("/", createTask); // POST /api/tasks
router.get("/", getTasks); // GET /api/tasks
router.put("/:taskId", updateTask); // PUT /api/tasks/:taskId
router.delete("/:taskId", deleteTask); // DELETE /api/tasks/:taskId

export default router;