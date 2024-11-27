import { Request, Response, NextFunction } from "express";
import { encrypt } from "../utils";

export function encryptionMiddleware(req: Request, res: Response, next: NextFunction) {
  if (process.env.ENCRYPTION_ENABLED !== "true") {
    return next();
  }

  const originalJson = res.json.bind(res);
  res.json = (data: unknown) => {
    try {
      const jsonString = JSON.stringify(data);
      const encryptedData = encrypt(jsonString);

      return originalJson({ data: encryptedData });
    } catch (error) {
      console.error("Error encrypting response:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };

  next();
}
