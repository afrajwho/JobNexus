import express from "express";
import { login, logout, register, updateProfile } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/mutler.js";
 
const userRoute = express.Router();

userRoute.route("/register").post(singleUpload,register);
userRoute.route("/login").post(login);
userRoute.route("/logout").get(logout);
userRoute.route("/profile/update").post(isAuthenticated,singleUpload,updateProfile);

export default userRoute;

