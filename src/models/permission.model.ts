import db from "../db/knex";
import { getCamelcaseKeys, getSnakecaseKeys } from "../utils";

export interface Permission {
  id: number;
  value: string;
  description: string;
}

const tableName = "permissions";

export const findAllPermissionsByIds = async (ids: number[]): Promise<Permission[] | undefined> => {
  try {
    const permissions = await db(tableName).whereIn("id", ids);
    return permissions ? ((await getCamelcaseKeys(permissions)) as Permission[]) : undefined;
  } catch (error) {
    console.error(`Error finding permission(s) by ids ${ids.join(",")}:`, error);
    throw error;
  }
};

export const findPermissionById = async (id: number): Promise<Permission | undefined> => {
  try {
    const permission = await db(tableName).where({ id }).first();
    return permission ? ((await getCamelcaseKeys(permission)) as Permission) : undefined;
  } catch (error) {
    console.error(`Error finding permission by id ${id}:`, error);
    throw error;
  }
};

export const findPermissionByValue = async (value: string): Promise<Permission | undefined> => {
  try {
    const permission = await db(tableName).where({ value }).first();
    return permission ? ((await getCamelcaseKeys(permission)) as Permission) : undefined;
  } catch (error) {
    console.error(`Error finding permission by value ${value}:`, error);
    throw error;
  }
};

export const createPermission = async (permission: Partial<Permission>): Promise<number[]> => {
  try {
    const payload = await getSnakecaseKeys(permission);
    return await db(tableName).insert(payload);
  } catch (error) {
    console.error("Error creating permission:", error);
    throw error;
  }
};

export const updatePermission = async (
  id: number,
  permission: Partial<Permission>,
): Promise<number> => {
  try {
    const payload = await getSnakecaseKeys(permission);
    return await db(tableName).where({ id }).update(payload);
  } catch (error) {
    console.error(`Error updating permission with id ${id}:`, error);
    throw error;
  }
};

export const deletePermission = async (id: number): Promise<number> => {
  try {
    return await db(tableName).where({ id }).delete();
  } catch (error) {
    console.error(`Error deleting permission with id ${id}:`, error);
    throw error;
  }
};
