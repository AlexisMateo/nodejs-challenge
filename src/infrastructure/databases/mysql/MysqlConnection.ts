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
  port: 3306,
  entities: [Entities.catalog, Entities.user, Entities.Supplier],
  synchronize:true,
  logging:["error","query"]
};

export const CreateDatabaseConnection = () =>
  createConnection(connectionConfig);
