import Joi from 'joi';

// Post  schema
const postSchema = Joi.object({
  title: Joi.string().trim().optional(),
  content: Joi.string().trim().required().messages({
    'string.empty': 'Content is required',
    'any.required': 'Content is required',
  }),
  shortDescription: Joi.string().trim().optional(),
});

// Create post validation schema
const createPost = Joi.object({
  body: postSchema,
});

// Update post validation schema
const updatePost = Joi.object({
  body: postSchema.fork(Object.keys(postSchema.describe().keys), (field) =>
    field.optional(),
  ),
});

export const postValidationSchema = {
  createPost,
  updatePost,
};
