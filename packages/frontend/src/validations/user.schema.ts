import * as yup from "yup";

const USERNAME_MIN_LENGTH = 3;
const USERNAME_MAX_LENGTH = 30;

export const usernameErrors = {
  required: "Username is a required field.",
  alphanumeric: "Username must be letters or numbers.",
  lessThanMin: `Username must be at least ${USERNAME_MIN_LENGTH} characters.`,
  greaterThanMax: `Username must be at most ${USERNAME_MAX_LENGTH} characters.`,
};

export const usernameSchema = yup
  .string()
  .required(usernameErrors.required)
  .matches(/^[a-zA-Z0-9]+$/, usernameErrors.alphanumeric)
  .min(USERNAME_MIN_LENGTH, usernameErrors.lessThanMin)
  .max(USERNAME_MAX_LENGTH, usernameErrors.greaterThanMax);

export const emailErrors = {
  required: "Email is a required field",
  email: "Email must be a valid format.",
};

export const emailSchema = yup
  .string()
  .required(emailErrors.required)
  .email(emailErrors.email);

const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 30;

export const passwordErrors = {
  required: "Password is a required field.",
  lessThanMin: `Password must be at least ${PASSWORD_MIN_LENGTH} characters.`,
  greaterThanMax: `Password must be at most ${PASSWORD_MAX_LENGTH} characters.`,
};

export const passwordSchema = yup
  .string()
  .required(passwordErrors.required)
  .min(PASSWORD_MIN_LENGTH, passwordErrors.lessThanMin)
  .max(PASSWORD_MAX_LENGTH, passwordErrors.greaterThanMax);

export const confirmPasswordErrors = {
  required: "Confirm Password is required.",
  mismatch: "Passwords must match.",
};

export const confirmPasswordSchema = yup
  .string()
  .required(confirmPasswordErrors.required)
  .oneOf([yup.ref("password"), null], confirmPasswordErrors.mismatch);

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
