import express from "express";
import rateLimit from "express-rate-limit";
import { loginController, getProfileController } from "../controllers";
import { encryptionMiddleware, authMiddleware } from "../middlewares";

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many login attempts from this IP, please try again later.",
});

const rateLimiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: Number(process.env.RATE_LIMIT_MAX_REQUESTS) || 1000,
  message: "Too many requests have been made from this IP. Please try again later.",
});

const authRoutes = express.Router();

authRoutes.post("/app/auth/login", authLimiter, encryptionMiddleware, loginController);
authRoutes.get(
  "/app/auth/profile",
  rateLimiter,
  authMiddleware,
  encryptionMiddleware,
  getProfileController,
);

export { authRoutes };
