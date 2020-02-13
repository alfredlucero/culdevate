import * as yup from "yup";
import { formRequiredError, formMinLengthError, formMaxLengthError } from "./formErrorMessages";

const USERNAME_MIN_LENGTH = 3;
const USERNAME_MAX_LENGTH = 30;

enum UserFields {
  username = "Username",
  email = "Email",
  password = "Password",
  confirmPassword = "Confirm Password",
}

export const usernameErrors = {
  required: formRequiredError({ field: UserFields.username }),
  alphanumeric: "Username must be letters or numbers.",
  lessThanMin: formMinLengthError({ field: UserFields.username, minLength: USERNAME_MIN_LENGTH }),
  greaterThanMax: formMaxLengthError({ field: UserFields.username, maxLength: USERNAME_MAX_LENGTH }),
};

export const usernameSchema = yup
  .string()
  .required(usernameErrors.required)
  .matches(/^[a-zA-Z0-9]+$/, usernameErrors.alphanumeric)
  .min(USERNAME_MIN_LENGTH, usernameErrors.lessThanMin)
  .max(USERNAME_MAX_LENGTH, usernameErrors.greaterThanMax);

export const emailErrors = {
  required: formRequiredError({ field: UserFields.email }),
  email: "Email must be a valid format.",
};

export const emailSchema = yup
  .string()
  .required(emailErrors.required)
  .email(emailErrors.email);

const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 30;

export const passwordErrors = {
  required: formRequiredError({ field: UserFields.password }),
  lessThanMin: formMinLengthError({ field: UserFields.password, minLength: PASSWORD_MIN_LENGTH }),
  greaterThanMax: formMaxLengthError({ field: UserFields.password, maxLength: PASSWORD_MAX_LENGTH }),
};

export const passwordSchema = yup
  .string()
  .required(passwordErrors.required)
  .min(PASSWORD_MIN_LENGTH, passwordErrors.lessThanMin)
  .max(PASSWORD_MAX_LENGTH, passwordErrors.greaterThanMax);

export const confirmPasswordErrors = {
  required: formRequiredError({ field: UserFields.confirmPassword }),
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
