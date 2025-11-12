import Joi from 'joi';

const loginValidation = Joi.object({
  body: Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': 'Please provide a valid email',
      'any.required': 'Email is required',
      'string.empty': 'Email is required',
    }),
    password: Joi.string().required().messages({
      'any.required': 'Password is required',
      'string.empty': 'Password is required',
    }),
  }),
});

const refreshTokenValidation = Joi.object({
  body: Joi.object({
    refreshToken: Joi.string().required().messages({
      'any.required': 'Refresh token is required',
      'string.empty': 'Refresh token is required',
    }),
  }),
});

export const authValidationSchema = {
  loginValidation,
  refreshTokenValidation,
};
