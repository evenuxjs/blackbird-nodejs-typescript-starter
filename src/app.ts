import express from "express";
import dotenv from "dotenv";
import path from "path";
import rateLimit from "express-rate-limit";
import cors from "cors";

// ----------------------------------------------------------------------

const env = process.env.NODE_ENV || "development";
const envPath = path.resolve(process.cwd(), `.env.${env}`);
dotenv.config({ path: envPath });

// ----------------------------------------------------------------------

import { authRoutes, userRoutes } from "./routes";
import { encryptionMiddleware, aclMiddleware, authMiddleware } from "./middlewares";
import db from "./db/knex";

// ----------------------------------------------------------------------

const app = express();

app.use(express.json());
app.use(cors());
app.use(authRoutes);

// ----------------------------------------------------------------------

const rateLimiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: Number(process.env.RATE_LIMIT_MAX_REQUESTS) || 1000,
  message: "Too many requests have been made from this IP. Please try again later.",
});

app.use(rateLimiter);

// ----------------------------------------------------------------------

app.get("/health", async (req, res) => {
  try {
    await db.raw("SELECT 1");
    res.json({ status: "ok", database: "connected" });
  } catch (error) {
    console.error("Database Health Check Error:", error);
    res.status(500).json({ status: "error", database: "disconnected" });
  }
});

app.use(encryptionMiddleware);

// ----------------------------------------------------------------------

// Add public routes here
// ...

// ----------------------------------------------------------------------

app.use(authMiddleware);
app.use(aclMiddleware);

// Add protected routes here
app.use(userRoutes);

export default app;
