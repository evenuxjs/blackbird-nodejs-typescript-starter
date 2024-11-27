/* eslint-disable @typescript-eslint/no-explicit-any */
exports.up = function (knex: {
  schema: { createTable: (arg0: string, arg1: (table: any) => void) => any };
}) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("email", 191).unique().notNullable();
    table.string("password").notNullable();
    table.string("role").notNullable().defaultTo("user");
    table.timestamps(true, true);
  });
};

exports.down = function (knex: { schema: { dropTable: (arg0: string) => any } }) {
  return knex.schema.dropTable("users");
};
