import { getEnv } from "./configuration";
import startup from "./startup";

const PORT = getEnv("PORT");

startup.listen(PORT, (err: Error) => {
  if (err) {
    console.log(err);
  }

  console.log(`Server Runnings on: http://localhost:${PORT}/api/v1`);
});
