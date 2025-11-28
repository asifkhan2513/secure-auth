import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";
import User from "../models/User.js";
import OTP from "../models/OTP.js";

// Helper to generate JWT
const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: "30d",
  });
};
interface SendOtpRequestBody {
  email: string;
}

export const signup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id.toString()),
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Explicitly select password because select: false was set in model
    const user = await User.findOne({ email }).select("+password");

    if (user && (await user.comparePassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id.toString()),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const sendotp = async (
  req: Request<any, any, SendOtpRequestBody>,
  res: Response
) => {
  try {
    const { email } = req.body;

    // --- Input Validation ---
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    console.log("Sending OTP to email:", email);

    // --- Check for Existing User ---
    // Assuming User.findOne returns a UserDocument or null
    const checkUserPresent = await User.findOne({ email });

    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: "User is Already Registered",
      });
    }

    // --- Generate Unique OTP ---
    let otp: string = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    console.log("Generated OTP:", otp);

    // Check if OTP already exists (ensure uniqueness)
    // Assuming OTP.findOne returns an OTPDocument or null
    let result = await OTP.findOne({ otp: otp });

    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      result = await OTP.findOne({ otp: otp });
    }

    console.log("Unique OTP generated:", otp);

    // --- Save OTP to Database (triggers post-save hook to send email) ---
    const otpPayload = { email, otp };
    const otpBody = await OTP.create(otpPayload);

    console.log("OTP saved to database:", otpBody);

    // --- Success Response ---
    res.status(200).json({
      success: true,
      message: "OTP Sent Successfully",
      // WARNING: Including the raw OTP in the response is a severe security risk.
      // It is kept here to match the original JS code but should be removed in production.
      otp,
    });
  } catch (error) {
    // --- Error Handling ---
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";

    console.error("SendOTP error:", errorMessage);
    console.error("Full error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send OTP. Please try again.",
      error: errorMessage,
    });
  }
};
