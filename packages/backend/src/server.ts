if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({
    path: `./.env.${process.env.CONFIG_ENV}`,
  });
  // Validate the .env file has environment variables properly filled out; otherwise, error out
  require("./utils/validateEnv").validateEnv();
}
import app from "./app";
import { setupDatabase } from "./db";

// We separate the set up of the Express server (app) from actually listening/starting up the server
// for testing purposes and for greater separation of concerns

// Start up the backend server against the environment's PORT
app.listen(process.env.PORT, () => {
  console.log(`Culdevate API starting on port ${process.env.PORT}...`);
});

setupDatabase();
