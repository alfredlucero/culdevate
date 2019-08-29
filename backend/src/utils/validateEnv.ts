import { cleanEnv, str, port } from "envalid";

const validateEnv = () => {
  cleanEnv(process.env, {
    MONGO_USER: str(),
    MONGO_PASSWORD: str(),
    MONGO_PATH: str(),
    PORT: port({ default: 3000 }),
  });
};

export { validateEnv };
