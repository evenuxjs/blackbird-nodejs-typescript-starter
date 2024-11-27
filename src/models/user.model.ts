import db from "../db/knex";
import bcrypt from "bcrypt";
import { getCamelcaseKeys, getSnakecaseKeys } from "../utils";

export interface User {
  id: number;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

const tableName = "users";

export const findAllUsers = async (): Promise<User[] | undefined> => {
  const users = await db(tableName);
  return users ? ((await getCamelcaseKeys(users)) as User[]) : undefined;
};

export const findUserById = async (id: number): Promise<User | undefined> => {
  const user = await db(tableName).where({ id }).first();
  return user ? ((await getCamelcaseKeys(user)) as User) : undefined;
};

export const findUserByEmail = async (email: string): Promise<User | undefined> => {
  const user = await db(tableName).where({ email }).first();
  return user ? ((await getCamelcaseKeys(user)) as User) : undefined;
};

export const createUser = async (user: Partial<User>): Promise<number[]> => {
  const existent = await findUserByEmail(user.email);
  if (existent) {
    throw new Error(`This email address is already in use!`);
  }

  const payload = await getSnakecaseKeys(user);
  payload.password = await bcrypt.hash(payload.password, 10);
  return await db(tableName).insert(payload);
};

export const updateUser = async (id: number, data: Partial<User>): Promise<number> => {
  const user = await findUserById(id);
  if (!user) {
    throw new Error(`User with ID ${id} not found.`);
  }

  if (user.role === "root") {
    throw new Error(`This user cannot be updated!`);
  }

  const payload = await getSnakecaseKeys(data);

  if (payload.password) {
    payload.password = await bcrypt.hash(payload.password, 10);
  }

  return await db(tableName).where({ id }).update(payload);
};

export const deleteUser = async (id: number): Promise<number> => {
  const user = await findUserById(id);

  if (user.role === "root") {
    throw new Error(`This user cannot be deleted!`);
  }

  return await db(tableName).where({ id }).delete();
};
