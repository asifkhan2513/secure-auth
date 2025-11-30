// routes/UserRoutes.ts

import { Router } from "express";
import { Request, Response } from "express";
import {
  login,
  signup,
  sendotp,
  logout,
} from "../controllers/UserControllers.js";
import { Auth } from "../middlewares/Auth.js";

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

// Route for user logout
router.post("/logout", logout);

// Protected route example
router.get("/profile", Auth, (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Profile accessed successfully",
    user: req.userDetails,
  });
});

export default router;
