/* eslint-disable @typescript-eslint/no-explicit-any */
exports.up = function (knex: {
  schema: { createTable: (arg0: string, arg1: (table: any) => void) => any };
}) {
  return knex.schema.createTable("permissions", (table) => {
    table.increments("id").primary();
    table.string("value", 191).unique().notNullable();
    table.string("description").notNullable();
  });
};

exports.down = function (knex: { schema: { dropTable: (arg0: string) => any } }) {
  return knex.schema.dropTable("permissions");
};
