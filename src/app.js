import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"
import feedbackRoutes from "./routes/feedbackRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
dotenv.config();
import chairpersonRoutes from "./routes/chairpersonRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/chairperson", chairpersonRoutes);
export default app;
