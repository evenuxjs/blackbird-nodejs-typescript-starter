import { Knex } from "knex";
import bcrypt from "bcrypt";

export async function seed(knex: Knex): Promise<void> {
  // --------------------------------------------------------------------------------
  // Users
  // --------------------------------------------------------------------------------

  await knex("users").del();
  const password = await bcrypt.hash("adminadmin", 10);
  await knex("users").insert([
    { email: "henrik@westerholm.dev", password: password, role: "root" },
  ]);

  // --------------------------------------------------------------------------------
  // Roles
  // --------------------------------------------------------------------------------

  await knex("roles").del();
  await knex("roles").insert([
    { name: "root" },
    { name: "administrator" },
    { name: "moderator" },
    { name: "user" },
  ]);

  // --------------------------------------------------------------------------------
  // Permissions
  // --------------------------------------------------------------------------------

  await knex("permissions").del();
  await knex("permissions").insert([
    { value: "api:users:list", description: "Allows listing users in the API" },
    {
      value: "api:users:create",
      description: "Allows creating users in the API",
    },
    {
      value: "api:users:fetch",
      description: "Allows fetching users in the API",
    },
    {
      value: "api:users:update",
      description: "Allows updating users in the API",
    },
    {
      value: "api:users:delete",
      description: "Allows deleting users in the API",
    },
  ]);

  // --------------------------------------------------------------------------------
  // Role permissions
  // --------------------------------------------------------------------------------

  await knex("role_permissions").del();
  const permissions = await knex("permissions").select("id");

  await knex("role_permissions").insert(
    permissions.map((p) => {
      return {
        role_id: 1, // root
        permission_id: p.id,
      };
    }),
  );
}
