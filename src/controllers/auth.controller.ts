import { Request, Response } from "express";
import { login, getProfile } from "../services";
import { loginSchema, profileSchema } from "../validators";

export const loginController = async (req: Request, res: Response): Promise<void> => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
    return;
  }

  try {
    const { email, password } = req.body;
    const token = await login(email, password);

    if (!token) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    res.status(200).json({ token });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: "Internal server error", error: error.message });
    } else {
      res.status(500).json({ message: "Internal server error", error: String(error) });
    }
  }
};

export const getProfileController = async (req: Request, res: Response): Promise<void> => {
  const { error } = profileSchema.validate(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
    return;
  }

  try {
    const userId = req.body.userId;
    const user = await getProfile(userId);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ data: user });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: "Internal server error", error: error.message });
    } else {
      res.status(500).json({ message: "Internal server error", error: String(error) });
    }
  }
};
