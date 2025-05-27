import * as dotenv from "dotenv";
import { DataSource } from "typeorm";
dotenv.config();

const isCI = process.env.CI === "true" || process.env.GITHUB_ACTIONS === "true";

const config = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  migrationsRun: process.env.DATABASE_MIGRATIONS === "true",
  logging: process.env.DATABASE_LOGGING === "true",
  synchronize: false,
  migrations: [__dirname + "/migrations/*.{ts,js}"],
  entities: [__dirname + "./../../**/*.entity{.ts,.js}"],
  ssl: isCI ? false : { rejectUnauthorized: false },
});

config
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

export default config;
