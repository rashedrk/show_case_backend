import Joi from 'joi';

const userSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    'string.empty': 'Name is required',
    'any.required': 'Name is required',
  }),
  email: Joi.string().email().trim().lowercase().required().messages({
    'string.email': 'Please provide a valid email',
    'string.empty': 'Email is required',
    'any.required': 'Email is required',
  }),
  phone: Joi.string().trim().required().messages({
    'string.empty': 'Phone is required',
    'any.required': 'Phone is required',
  }),
  address: Joi.string().trim().required().messages({
    'string.empty': 'Address is required',
    'any.required': 'Address is required',
  }),
  gender: Joi.string().valid('male', 'female').required().messages({
    'any.only': 'Gender must be either male or female',
    'any.required': 'Gender is required',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password must be at least 6 characters',
    'string.empty': 'Password is required',
    'any.required': 'Password is required',
  }),
  role: Joi.string().valid('user').optional().messages({
    'any.only': 'Role must be user',
  }),
});

// Create user validation schema
const createUser = Joi.object({
  body: userSchema,
});

// Update user validation schema
const updateUser = Joi.object({
  body: userSchema.fork(Object.keys(userSchema.describe().keys), (field) =>
    field.optional(),
  ),
});

export const userValidation = {
  createUser,
  updateUser,
};
