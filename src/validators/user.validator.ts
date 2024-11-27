import Joi from "joi";

export const createUserSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid("administrator", "moderator", "user").required(),
});

export const updateUserSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .optional(),
  password: Joi.string().min(6).optional(),
  role: Joi.string().valid("administrator", "moderator", "user").optional(),
});
