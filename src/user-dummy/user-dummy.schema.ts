import * as Joi from 'joi';

export const createUserSchema = Joi.object({
  email: Joi.string().email().min(6).required().messages({
    'string.base': 'Email must be a string',
    'string.email': 'Email must be a valid email',
    'string.min': 'Email must be at least 6 characters long',
    'any.required': 'Email is required',
  }),
  name: Joi.string().min(4).optional().messages({
    'string.base': 'Name must be a string',
    'string.min': 'Name must be at least 4 characters long',
  }),
})
  .required()
  .messages({
    'object.base': 'Request body must be an object',
    'any.required': 'Request body cannot be empty',
  });

export const updateUserSchema = Joi.object({
  email: Joi.string().email().min(6).optional().messages({
    'string.base': 'Email must be a string',
    'string.email': 'Email must be a valid email',
    'string.min': 'Email must be at least 6 characters long',
    'any.required': 'Email is required',
  }),
  name: Joi.string().min(4).optional().messages({
    'string.base': 'Name must be a string',
    'string.min': 'Name must be at least 4 characters long',
  }),
})
  .min(1)
  .messages({
    'object.min': 'At least one field (name or email) must be provided',
    'any.required': 'Request body cannot be empty',
  });
