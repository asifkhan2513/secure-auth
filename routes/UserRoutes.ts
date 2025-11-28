// routes/UserRoutes.ts

import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import { login, signup, sendotp } from "../controllers/UserControllers.js";
import { Auth } from "../middlewares/Auth.js";

interface ControllerFunction {
  (req: Request, res: Response, next: NextFunction): Promise<void> | void;
}

// Create a new router instance
const router: Router = Router();

// --------------------------------------------------------------------------------------------------------
//                                           Authentication routes
// --------------------------------------------------------------------------------------------------------

// Route for user login
router.post("/login", login);

// Route for user signup
router.post("/signup", signup);

// Route for sending OTP to the user's email
router.post("/sendotp", sendotp);

export default router;
