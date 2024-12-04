import { Knex } from "knex";
import dotenv from "dotenv";
import path from "path";

const env = process.env.NODE_ENV || "development";
const envPath = path.resolve(process.cwd(), "../..", `.env.${env}`);
dotenv.config({ path: envPath });

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "mysql2",
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      timezone: "+03:00",
    },
    migrations: {
      directory: path.join(__dirname, "./migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "./seeds"),
    },
  },
  production: {
    client: "mysql2",
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      timezone: "+03:00",
    },
    migrations: {
      directory: path.join(__dirname, "./migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "./seeds"),
    },
  },
};

export default config;
