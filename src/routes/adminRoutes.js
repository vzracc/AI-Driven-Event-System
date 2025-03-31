import express from "express";
import { registerCollege, registerCommunity, registerEvent } from "../controllers/adminController.js";
import { authenticateUser, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/college", authenticateUser, authorizeRoles("Admin"), registerCollege);
router.post("/community", authenticateUser, authorizeRoles("Admin"), registerCommunity);
router.post("/event", authenticateUser, authorizeRoles("Admin"), registerEvent);

export default router;
