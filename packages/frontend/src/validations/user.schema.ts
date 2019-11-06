import * as yup from "yup";

const USERNAME_MIN_LENGTH = 3;
const USERNAME_MAX_LENGTH = 30;

export const usernameSchema = yup
  .string()
  .required("Username is a required field.")
  .matches(/^[a-zA-Z0-9]+$/, "Username must be letters or numbers.")
  .min(USERNAME_MIN_LENGTH, `Username must be at least ${USERNAME_MIN_LENGTH} characters.`)
  .max(USERNAME_MAX_LENGTH, `Username must be at at most ${USERNAME_MAX_LENGTH} characters.`);

export const emailSchema = yup
  .string()
  .required("Email is a required field.")
  .email("Email must be a valid format.");

const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 30;

export const passwordSchema = yup
  .string()
  .required("Password is a required field")
  .min(PASSWORD_MIN_LENGTH, `Password must be at least ${PASSWORD_MIN_LENGTH} characters.`)
  .max(PASSWORD_MAX_LENGTH, `Password must be at most ${PASSWORD_MAX_LENGTH} characters.`);

export const confirmPasswordSchema = yup
  .string()
  .required("Confirm Password is required.")
  .oneOf([yup.ref("password"), null], "Passwords must match.");

export const userCredentialsSchema = yup.object({
  username: usernameSchema,
  password: passwordSchema,
});

export const signupUserSchema = yup.object({
  username: usernameSchema,
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: confirmPasswordSchema,
});
