import { Router } from "express";
import validateToken from "../middlewares/validateToken.js";
import UserController from "../controllers/userController.js";
import * as signUpValidators from "../middlewares/validateSignUp.js";

const router = Router();
const userController = new UserController();
const signUpMiddleware = [
  signUpValidators.validateRequiredFields,
  signUpValidators.validateUsernameLength,
  signUpValidators.validateEmailFormat,
  signUpValidators.validateAddress,
  signUpValidators.validatePasswordLength,
  signUpValidators.checkExistingUsername,
  signUpValidators.checkExistingEmail,
];

// Sign Up
router.post("/sign-up", signUpMiddleware, userController.signUp);

// Sign In
router.post("/sign-in", userController.signIn);

// get user information
router.get("/get-user-info", validateToken, userController.getUserInfo);

// update address
router.put("/update-user-details", validateToken, userController.updateUserDetails);

export default router;
