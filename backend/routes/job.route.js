import { Router } from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  getAdminJobs,
  getAllJobs,
  getJobById,
  postJob,
} from "../controllers/job.controller.js";

const jobRoute = Router();

jobRoute.post("/post", isAuthenticated, postJob);
jobRoute.get("/get", isAuthenticated, getAllJobs);
jobRoute.get("/getadminjobs", isAuthenticated, getAdminJobs);
jobRoute.get("/get/:id", isAuthenticated, getJobById);

export default jobRoute;
