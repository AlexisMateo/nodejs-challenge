import { createConnection, ConnectionOptions, Connection } from "typeorm";

import Entities from "../../../domain/entities";
import { getEnv } from "../../../configuration";

const connectionConfig: ConnectionOptions = {
  name: "default",
  type: "mysql",
  host: getEnv("DB_HOST"),
  username: getEnv("DB_USER"),
  password: getEnv("DB_PASSWORD"),
  database: getEnv("DB_NAME"),
  // insecureAuth: true,
  port: 3306,
  // ssl: true,
  logging: ["query", "error"],
  // extra: { insecureAuth: true },
  entities: [Entities.catalog, Entities.user],
};

export const CreateDatabaseConnection = () =>
  createConnection(connectionConfig);
