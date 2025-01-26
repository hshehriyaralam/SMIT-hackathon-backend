// app.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import adminRoutes from "./routes/adminRoutes.js";
import guarantorRoutes from "./routes/guarantorRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import loanRoutes from "./routes/loanRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/admins", adminRoutes);
app.use("/api/guarantor", guarantorRoutes);
app.use("/api/appointment", appointmentRoutes);
app.use("/api/loan", loanRoutes);
app.use("/api/user", userRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
