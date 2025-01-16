import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL, // Allow requests from the frontend
}));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev")); // Log HTTP requests
app.use(helmet({
    crossOriginResourcePolicy: false, // Allow cross-origin resources
}));

const PORT = process.env.PORT || 8080;

// Root Route
app.get("/", (req, res) => {
    res.json({
        message: `Job Portal Server is running on port ${PORT}`,
    });
});

// API Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// Start the Server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error("Failed to connect to the database:", error.message);
    process.exit(1);
});
