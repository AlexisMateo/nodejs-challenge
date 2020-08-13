import { config } from "dotenv";

if (process.env.NODE_ENV !== "production") {
  config();
}

export const getEnv = function (key: string): string | undefined {
  return process.env[key];
};
