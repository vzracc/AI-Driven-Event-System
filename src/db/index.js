import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/eventdb"; 

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI)
        console.log("✅ MongoDB Connected!");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error.message);
        process.exit(1);
    }
};

export default connectDB;
