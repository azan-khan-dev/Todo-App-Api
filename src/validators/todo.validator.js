// validators/todo.validator.js
import Joi from 'joi';

// ------------------------------------------
// CREATE TODO SCHEMA
// ------------------------------------------
const createTodoSchema = Joi.object({
  title: Joi.string().trim().min(2).max(255).required().messages({
    "string.empty": "Title is required",
    "string.min": "Title must be at least 2 characters long",
    "string.max": "Title must not exceed 255 characters",
    "any.required": "Title is required",
  }),

  description: Joi.string()
    .trim()
    .allow("") 
    .max(1000)
    .messages({
      "string.max": "Description must not exceed {#limit} characters",
    }),

  priority: Joi.string()
    .valid("low", "medium", "high") 
    .messages({
      "any.only": "Priority must be one of: low, medium, high",
    }),

  dueDate: Joi.date()
    .iso() 
    .allow(null)
    .messages({
      "date.format": "Due date must be a valid date (YYYY-MM-DD)",
      "date.base": "Due date must be a valid date",
    }),
});


// UPDATE TODO SCHEMA (sab fields optional)

const updateTodoSchema = Joi.object({
  title: Joi.string()
    .trim()
    .min(2)
    .max(255)
    .messages({
      'string.empty': 'Title cannot be empty',
      'string.min': 'Title must be at least {#limit} characters long',
      'string.max': 'Title must not exceed {#limit} characters',
    }),

  description: Joi.string()
    .trim()
    .allow('')
    .max(1000)
    .messages({
      'string.max': 'Description must not exceed {#limit} characters',
    }),

  priority: Joi.string()
    .valid('low', 'medium', 'high')
    .messages({
      'any.only': 'Priority must be one of: low, medium, high',
    }),

  dueDate: Joi.date()
    .iso()
    .allow(null)
    .messages({
      'date.format': 'Due date must be a valid date (YYYY-MM-DD)',
      'date.base': 'Due date must be a valid date',
    }),

  isCompleted: Joi.boolean()
    .messages({
      'boolean.base': 'isCompleted must be true or false',
    }),
})
  .min(1)   
  .messages({
    'object.min': 'At least one field is required to update',
  });

// ------------------------------------------
// EXPORT
// ------------------------------------------
export { createTodoSchema, updateTodoSchema };