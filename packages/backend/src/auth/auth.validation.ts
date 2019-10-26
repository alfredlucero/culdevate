import Joi from "@hapi/joi";

const USERNAME_MIN_LENGTH = 3;
const USERNAME_MAX_LENGTH = 30;

const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 30;

export const SignupUserSchema = Joi.object().keys({
  username: Joi.string()
    .alphanum()
    .min(USERNAME_MIN_LENGTH)
    .max(USERNAME_MAX_LENGTH)
    .required(),
  email: Joi.string()
    .email()
    .required(),
  // TODO: force 1 capital letter and 1 special character into this validation
  // Figure out a better way to find aggregate errors
  password: Joi.string()
    .min(PASSWORD_MIN_LENGTH)
    .max(PASSWORD_MAX_LENGTH)
    .required(),
});

export const UserCredentialsSchema = Joi.object().keys({
  username: Joi.string()
    .alphanum()
    .min(USERNAME_MIN_LENGTH)
    .max(USERNAME_MAX_LENGTH)
    .required(),
  password: Joi.string()
    .min(PASSWORD_MIN_LENGTH)
    .max(PASSWORD_MAX_LENGTH)
    .required(),
});
