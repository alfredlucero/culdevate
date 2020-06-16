import { cleanEnv, str, port } from "envalid";

// Only mean to be used in development mode/local testing
const validateEnv = () => {
  cleanEnv(process.env, {
    MONGO_USER: str(),
    MONGO_PASSWORD: str(),
    MONGO_PATH: str(),
    PORT: port({ default: 3000 }),
    JWT_SECRET: str(),
  });
};

export { validateEnv };
