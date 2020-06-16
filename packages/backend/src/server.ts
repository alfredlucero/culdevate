// When running our server in production mode in say Heroku,
// the dev dependencies won't be installed, so we need to make sure to guard these dotenv checks
// as we'll provide the environment variables through the Heroku Config Vars
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
