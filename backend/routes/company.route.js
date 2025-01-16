import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controllers/company.controller.js";
import { singleUpload } from "../middlewares/mutler.js";

const companyRoute = express.Router();

companyRoute.route("/register").post(isAuthenticated,registerCompany);
companyRoute.route("/get").get(isAuthenticated,getCompany);
companyRoute.route("/get/:id").get(isAuthenticated,getCompanyById);
companyRoute.route("/update/:id").put(isAuthenticated,singleUpload, updateCompany);

export default companyRoute;

