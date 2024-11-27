import db from "../db/knex";
import { getCamelcaseKeys, getSnakecaseKeys } from "../utils";

export interface Role {
  id: number;
  name: string;
}

const tableName = "roles";

export const findRoleById = async (id: number): Promise<Role | undefined> => {
  const role = await db(tableName).where({ id }).first();
  return (await getCamelcaseKeys(role)) as Role;
};

export const findRoleByName = async (name: string): Promise<Role | undefined> => {
  const role = await db(tableName).where({ name }).first();
  return (await getCamelcaseKeys(role)) as Role;
};

export const createRole = async (role: Partial<Role>): Promise<number> => {
  const payload = await getSnakecaseKeys(role);
  const [roleId] = await db(tableName).insert(payload);
  return roleId;
};

export const updateRole = async (id: number, role: Partial<Role>): Promise<number> => {
  const payload = await getSnakecaseKeys(role);
  return await db(tableName).where({ id }).update(payload);
};

export const deleteRole = async (id: number): Promise<number> => {
  return await db(tableName).where({ id }).delete();
};
