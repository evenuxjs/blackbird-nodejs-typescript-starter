import {
  findUserByEmail,
  findUserById,
  User,
  findRoleByName,
  findAllRolePermissionsByRoleId,
  findAllPermissionsByIds,
} from "../models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (email: string, password: string): Promise<string | null> => {
  const user = await findUserByEmail(email);
  if (!user) {
    return null;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return null;
  }

  const role = await findRoleByName(user.role);
  if (!role) {
    return null;
  }

  const rolePermissions = await findAllRolePermissionsByRoleId(role.id);
  const permissions = await findAllPermissionsByIds(rolePermissions.map((rp) => rp.permissionId));
  const permissionValues = permissions.map((p) => p.value);

  const token = jwt.sign({ user, permissions: permissionValues }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });

  return token;
};

export const getProfile = async (userId: number): Promise<User | null> => {
  const user = await findUserById(userId);
  if (!user) {
    return null;
  }

  delete user.password;

  return user;
};
