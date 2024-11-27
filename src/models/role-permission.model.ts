import db from "../db/knex";
import { getCamelcaseKeys, getSnakecaseKeys } from "../utils";

export interface RolePermission {
  id: number;
  roleId: number;
  permissionId: number;
}

const tableName = "role_permissions";

export const findRolePermissionById = async (id: number): Promise<RolePermission | undefined> => {
  try {
    const rolePermission = await db(tableName).where({ id }).first();
    return rolePermission
      ? ((await getCamelcaseKeys(rolePermission)) as RolePermission)
      : undefined;
  } catch (error) {
    console.error(`Error finding role permission by id ${id}:`, error);
    throw error;
  }
};

export const findAllRolePermissionsByRoleId = async (
  roleId: number,
): Promise<RolePermission[] | undefined> => {
  try {
    const rolePermissions = await db(tableName).where({ role_id: roleId });
    return rolePermissions
      ? ((await getCamelcaseKeys(rolePermissions)) as RolePermission[])
      : undefined;
  } catch (error) {
    console.error(`Error finding role permission(s) by role id ${roleId}:`, error);
    throw error;
  }
};

export const createRolePermission = async (
  rolePermission: Partial<RolePermission>,
): Promise<number[]> => {
  try {
    const payload = await getSnakecaseKeys(rolePermission);
    return await db(tableName).insert(payload);
  } catch (error) {
    console.error("Error creating role permission(s):", error);
    throw error;
  }
};

export const deleteRolePermission = async (id: number): Promise<number> => {
  try {
    return await db(tableName).where({ id }).delete();
  } catch (error) {
    console.error(`Error deleting role permission with id ${id}:`, error);
    throw error;
  }
};
