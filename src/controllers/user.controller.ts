import { Request, Response } from "express";
import { listUsers } from "../services";
import { createUser, deleteUser, findUserById, updateUser } from "../models";
import { createUserSchema, updateUserSchema } from "../validators";

export const listUsersController = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await listUsers();

    if (!users || !users.length) {
      res.status(404).json({ message: "Failed to fetch users, no users found." });
      return;
    }

    res.status(200).json({ data: users });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: "Internal server error", error: error.message });
    } else {
      res.status(500).json({ message: "Internal server error", error: String(error) });
    }
  }
};

export const fetchUserController = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await findUserById(Number(req.params.id));

    if (!user) {
      res.status(404).json({ message: "Failed to fetch user, no user found." });
      return;
    }

    delete user.password;

    res.status(200).json({ data: user });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: "Internal server error", error: error.message });
    } else {
      res.status(500).json({ message: "Internal server error", error: String(error) });
    }
  }
};

export const createUserController = async (req: Request, res: Response): Promise<void> => {
  const { error } = createUserSchema.validate(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
    return;
  }

  try {
    const [userId] = await createUser(req.body);
    res.status(201).json({ data: userId });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: "Internal server error", error: error.message });
    } else {
      res.status(500).json({ message: "Internal server error", error: String(error) });
    }
  }
};

export const updateUserController = async (req: Request, res: Response): Promise<void> => {
  const { error } = updateUserSchema.validate(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
    return;
  }

  try {
    const rowsAffected = await updateUser(Number(req.params.id), req.body);
    res.status(201).json({ data: { success: rowsAffected === 1 } });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: "Internal server error", error: error.message });
    } else {
      res.status(500).json({ message: "Internal server error", error: String(error) });
    }
  }
};

export const deleteUserController = async (req: Request, res: Response): Promise<void> => {
  try {
    const rowsAffected = await deleteUser(Number(req.params.id));
    res.status(201).json({ data: { success: rowsAffected === 1 } });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: "Internal server error", error: error.message });
    } else {
      res.status(500).json({ message: "Internal server error", error: String(error) });
    }
  }
};
