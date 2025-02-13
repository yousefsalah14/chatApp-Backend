import joi from 'joi'
export const signup = joi.object({
  fullName : joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
}).required();
export const login = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
}).required();