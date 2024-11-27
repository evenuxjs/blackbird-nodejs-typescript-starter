/* eslint-disable @typescript-eslint/no-explicit-any */
exports.up = function (knex: {
  schema: { createTable: (arg0: string, arg1: (table: any) => void) => any };
}) {
  return knex.schema.createTable("role_permissions", (table) => {
    table.increments("id").primary();
    table.integer("role_id").unsigned().notNullable();
    table.foreign("role_id").references("roles.id");
    table.integer("permission_id").unsigned().notNullable();
    table.foreign("permission_id").references("permissions.id");
  });
};

exports.down = function (knex: { schema: { dropTable: (arg0: string) => any } }) {
  return knex.schema.dropTable("role_permissions");
};
