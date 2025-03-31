import connectDB from "./db/index.js"; // Use .js extension explicitly
import app from "./app.js";

const PORT = process.env.PORT || 8000;

// Connect to MongoDB and Start Server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
});

