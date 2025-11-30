import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

// Interface for the JWT payload you expect
interface JwtPayload {
  id: string;
  email: string;
  iat: number;
  exp: number;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
      userDetails?: any; // Replace 'any' with the actual Mongoose Document type if available
    }
  }
}

export const Auth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    let token: string | null = null;

    // Check for token in cookies (priority order: jwt, token)
    if (req.cookies && req.cookies.jwt) {
      token = req.cookies.jwt;
    } else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    } else if (req.header("Authorization")) {
      const authHeader = req.header("Authorization");
      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.replace("Bearer ", "");
      }
    } else if (req.body && req.body.token) {
      token = req.body.token;
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access Denied. No authentication token provided.",
      });
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error("JWT_SECRET is not set in environment variables.");
      return res.status(500).json({
        success: false,
        message: "Server configuration error.",
      });
    }

    try {
      const decoded = jwt.verify(token, jwtSecret) as JwtPayload;

      const user = await User.findById(decoded.id).select("-password");
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "User not found. Token is invalid.",
        });
      }

      req.user = decoded;
      req.userDetails = user;

      next();
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return res.status(401).json({
          success: false,
          message: "Token has expired. Please login again.",
        });
      } else if (error instanceof jwt.JsonWebTokenError) {
        return res.status(401).json({
          success: false,
          message: "Invalid token. Authentication failed.",
        });
      } else {
        return res.status(401).json({
          success: false,
          message: "Token verification failed.",
        });
      }
    }
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error during authentication.",
    });
  }
};
