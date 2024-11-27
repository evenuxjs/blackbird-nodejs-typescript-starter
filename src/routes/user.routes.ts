import express from "express";
import {
  listUsersController,
  fetchUserController,
  createUserController,
  updateUserController,
  deleteUserController,
} from "../controllers";

const userRoutes = express.Router();

userRoutes.get("/admin/users/list", listUsersController);
userRoutes.get("/admin/users/single/:id", fetchUserController);
userRoutes.post("/admin/users", createUserController);
userRoutes.put("/admin/users/:id", updateUserController);
userRoutes.delete("/admin/users/:id", deleteUserController);

export { userRoutes };
