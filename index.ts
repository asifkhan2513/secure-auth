import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/UserRoutes.js";
import connectDB from "./config/database.js";

dotenv.config();

const app = express();

// Connect to database
connectDB();

app.use(express.json());

// Mount the Auth Module
app.use("/api/v1", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
