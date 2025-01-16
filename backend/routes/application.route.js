import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../controllers/application.controller.js";
 
const applicationRoute = express.Router();

applicationRoute.route("/apply/:id").get(isAuthenticated, applyJob);
applicationRoute.route("/get").get(isAuthenticated, getAppliedJobs);
applicationRoute.route("/:id/applicants").get(isAuthenticated, getApplicants);
applicationRoute.route("/status/:id/update").post(isAuthenticated, updateStatus);
 

export default applicationRoute;

