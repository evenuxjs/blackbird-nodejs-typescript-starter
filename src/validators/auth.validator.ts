import Joi from "joi";

export const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().min(6).required(),
});

export const profileSchema = Joi.object({
  userId: Joi.number().integer().positive().required(),
});
