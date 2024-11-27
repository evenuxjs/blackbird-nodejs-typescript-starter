import knex, { Knex } from "knex";
import knexConfig from "./config";

const environment = process.env.NODE_ENV || "development";
const config: Knex.Config = knexConfig[environment];
const db: Knex = knex(config);

export default db;
