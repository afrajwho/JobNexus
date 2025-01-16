import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  getAdminJobs,
  getAllJobs,
  getJobById,
  postJob,
} from "../controllers/job.controller.js";

// Middleware to check if user is an admin
const isAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: "Access denied. Admin privileges required."
    });
  }
  next();
};

const router = express.Router();

// Public routes (if any)
// router.get("/public", getAllPublicJobs);

// Protected routes - require authentication
router.route("/")
  .get(isAuthenticated, getAllJobs)     // GET /api/jobs
  .post(isAuthenticated, postJob);      // POST /api/jobs

// Protected routes with ID parameter
router.route("/:id")
  .get(isAuthenticated, getJobById);    // GET /api/jobs/:id

// Admin only routes
router.route("/admin/jobs")
  .get(isAuthenticated, isAdmin, getAdminJobs);  // GET /api/jobs/admin/jobs

// Error handling for undefined routes
router.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Job route not found"
  });
});

export default router;