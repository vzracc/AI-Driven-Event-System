import express from "express";
import { getAllUsers, getUserById } from "../controllers/userController.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Protected Routes (only accessible after authentication)
router.get("/", authenticateUser, getAllUsers);
router.get("/:id", authenticateUser, getUserById);

export default router;
