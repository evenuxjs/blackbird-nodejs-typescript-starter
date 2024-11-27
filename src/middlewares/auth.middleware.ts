import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { User } from "../models";

interface VerifiedToken extends jwt.JwtPayload {
  user: User;
  permissions: string[];
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET) as VerifiedToken;
    if (!verified || !verified.user || !verified.permissions || !verified.permissions.length) {
      throw new Error("Failed to verify session");
    } else {
      req.user = verified.user || null;
      req.permissions = verified.permissions || [];
    }

    next();
  } catch (error) {
    console.error(`Error validating authenticated user:`, error);
    return res.status(400).json({ error: "Invalid JWT token specified!" });
  }
};

export { authMiddleware };
